import ImageCard from "../ImageCard/ImageCard";
import css from "./ImageGallery.module.css";

export default function ImageGallery({ imageObj, onClick }) {
    return (
        <ul className={css.galleryList}>
            {imageObj.map((image) => (
                <li key={image.id} className={css.galleryItem}>
                    <ImageCard imageItem={image} onClick={onClick} />
                </li>
            ))}
        </ul>
    );
}
