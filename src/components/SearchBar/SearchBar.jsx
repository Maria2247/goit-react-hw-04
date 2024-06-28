import toast, { Toaster } from "react-hot-toast";
import css from "./SearchBar.module.css";

export default function SearchBar({ onSubmit, inputValue, setInputValue }) {
    const handleSubmit = (evt) => {
        evt.preventDefault();

        if (inputValue === "") {
            const notify = () => {
                toast("Oops, we can't inspire you with an empty search", { duration: 2000 });
            };
            return notify();
        }

        onSubmit();
    };
    return (
        <header className={css.header}>
            <form onSubmit={handleSubmit} className={css.form}>
                <input type="text" name="topic" value={inputValue} onChange={(e) => setInputValue(e.target.value.trim())} autoComplete="off" autoFocus placeholder="What inspires you?" className={css.input} />
                <button type="submit" className={css.searchBtn}>
                    Search
                </button>
            </form>
            <Toaster />
        </header>
    );
}
