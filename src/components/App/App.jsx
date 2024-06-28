import SearchBar from "../SearchBar/SearchBar";
import ImageGallery from "../ImageGallery/ImageGallery";
import ErrorMeassage from "../ErrorMessage/ErrorMessage";
import Loader from "../Loader/Loader";
import ImageModal from "../ImageModal/ImageModal";
import { useState } from "react";
import { fetchUnsplashImages } from "../../helpers/images-api";
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
            const queryResult = await fetchUnsplashImages(inputValue, 1);
            setImages(queryResult.results);
            setMaxPage(queryResult.total_pages);
            setPage(1);
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
            const queryResult = await fetchUnsplashImages(inputValue, nextPage);
            setImages((prevImages) => [...prevImages, ...queryResult.results]);
            setMaxPage(queryResult.total_pages);
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
            {!loading && maxPage > 1 && page <= maxPage && <button onClick={handleLoadMore}>Load more</button>}
        </div>
    );
}
