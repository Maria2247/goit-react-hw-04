import SearchBar from "../SearchBar/SearchBar";
import ImageGallery from "../ImageGallery/ImageGallery";
import ErrorMeassage from "../ErrorMessage/ErrorMessage";
import Loader from "../Loader/Loader";
import toast, { Toaster } from "react-hot-toast";
import ImageModal from "../ImageModal/ImageModal";
import { useState, useEffect } from "react";
import { fetchUnsplashImages } from "../../helpers/images-api";
import LoadMoreBtn from "../LoadMoreBtn/LoadMoreBtn";

export default function App() {
    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [maxPage, setMaxPage] = useState(0);
    const [page, setPage] = useState(1);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [largeImg, setLargeImg] = useState(null);
    const [inputValue, setInputValue] = useState("");
    const [showBtn, setShowBtn] = useState(false);

    const openModal = (largeImg) => {
        setModalIsOpen(true);
        setLargeImg(largeImg);
    };

    const closeModal = () => {
        setModalIsOpen(false);
        setLargeImg(null);
    };

    const handleSearch = async (newQuery) => {
        setImages([]);
        setPage(1);
        setInputValue(newQuery);
    };

    const handleLoadMore = () => {
        setPage((prevPage) => prevPage + 1);
    };

    useEffect(() => {
        if (inputValue === "") return;
        async function getImages() {
            try {
                setLoading(true);
                setError(false);
                const queryResult = await fetchUnsplashImages(inputValue, page);
                if (queryResult.results.length === 0) {
                    setShowBtn(false);
                    const notify = () => {
                        toast("Oops, couldn't find anything", { duration: 2000 });
                    };
                    return notify();
                }
                setImages((prevImages) => {
                    return [...prevImages, ...queryResult.results];
                });
                setMaxPage(queryResult.total_pages);
            } catch (error) {
                setError(true);
            } finally {
                setLoading(false);
            }
        }
        getImages();
    }, [inputValue, page]);

    useEffect(() => {
        setShowBtn(page < maxPage);
    }, [page, maxPage]);

    return (
        <div>
            <SearchBar onSubmit={handleSearch} />
            {error && <ErrorMeassage />}
            {images.length > 0 && <ImageGallery imageObj={images} onClick={openModal} />}
            {loading && <Loader />}
            <ImageModal isOpen={modalIsOpen} closeModal={closeModal} imageUrl={largeImg} />
            {showBtn && <LoadMoreBtn onClick={handleLoadMore} id="app" />}
            <Toaster />
        </div>
    );
}
