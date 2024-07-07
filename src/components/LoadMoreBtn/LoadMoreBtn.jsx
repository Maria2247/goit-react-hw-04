import css from "./LoadMoreBtn.module.css";
export default function LoadMoreBtn({ onClick }) {
    return (
        <button onClick={onClick} className={css.btn}>
            Load more
        </button>
    );
}
