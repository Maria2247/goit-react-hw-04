import css from "./ImageCard.module.css";

export default function ImageCard({
    imageItem: {
        urls: { small, regular },
        alt_description,
    },
    onClick,
}) {
    return (
        <div className={css.imgItem}>
            <img src={small} alt={alt_description} onClick={() => onClick(regular)} />
        </div>
    );
}
