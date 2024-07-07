import css from "./ImageCard.module.css";

export default function ImageCard({
    imageItem: {
        urls: { small, regular },
        alt_description,
    },
    onClick,
}) {
    return (
        <div className={css.imgHolder}>
            <img src={small} alt={alt_description} onClick={() => onClick(regular)} className={css.image} />
        </div>
    );
}
