import SearchBar from "../SearchBar/SearchBar";
import ImageGallery from "../ImageGallery/ImageGallery";
import ErrorMeassage from "../ErrorMessage/ErrorMessage";
import Loader from "../Loader/Loader";
import toast from "react-hot-toast";
import ImageModal from "../ImageModal/ImageModal";
import { useState } from "react";
import { fetchUnsplashImages } from "../../helpers/images-api";
import LoadMoreBtn from "../LoadMoreBtn/LoadMoreBtn";
// import css from "./App.module.css";

export default function App() {
    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [maxPage, setMaxPage] = useState(0);
    const [page, setPage] = useState(1);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [largeImg, setLargeImg] = useState(null);
    const [inputValue, setInputValue] = useState("");

    // Відкриваємо модальне вікно з великою картинкою
    const openModal = (largeImg) => {
        setModalIsOpen(true);
        setLargeImg(largeImg);
    };

    // Закриваємо модальне вікно з великою картинкою
    const closeModal = () => {
        setModalIsOpen(false);
        setLargeImg(null);
    };

    const handleSearch = async () => {
        try {
            setImages([]);
            setError(false);
            setLoading(true);
            setPage(1);
            const queryResult = await fetchUnsplashImages(inputValue, 1);
            if (queryResult.results.length === 0) {
                toast.info();
                return;
            }
            setImages(queryResult.results);
            setMaxPage(queryResult.total_pages);
        } catch (error) {
            setError(true);
        } finally {
            setLoading(false);
        }
    };

    const handleLoadMore = async () => {
        try {
            setLoading(true);
            const nextPage = page + 1;
            const queryResultMore = await fetchUnsplashImages(inputValue, nextPage);
            setImages((prevImages) => [...prevImages, ...queryResultMore.results]);
            setMaxPage(queryResultMore.total_pages);
            setPage(nextPage);
            window.scrollBy({
                top: 300,
                behavior: "smooth",
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div id="app">
            <SearchBar inputValue={inputValue} setInputValue={setInputValue} onSubmit={handleSearch} />
            {error && <ErrorMeassage />}
            {images.length > 0 && <ImageGallery imageObj={images} onClick={openModal} />}
            {loading && <Loader />}
            <ImageModal isOpen={modalIsOpen} closeModal={closeModal} imageUrl={largeImg} />
            {!loading && maxPage > 1 && page <= maxPage && <LoadMoreBtn onClick={handleLoadMore} />}
        </div>
    );
}
