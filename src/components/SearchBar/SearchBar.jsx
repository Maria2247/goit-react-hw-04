import { Formik, Form, Field } from "formik";
import css from "./SearchBar.module.css";
import toast, { Toaster } from "react-hot-toast";

// import { act } from "react";

export default function SearchBar({ onSubmit }) {
    return (
        <header className={css.header}>
            <Formik
                initialValues={{ query: "" }}
                onSubmit={(values, actions) => {
                    if (values.query.trim() === "") {
                        const notify = () => {
                            toast("Oops, we can't inspire you with an empty search", { duration: 2000 });
                        };
                        return notify();
                    }
                    onSubmit(values.query.trim());
                    actions.resetForm();
                }}
            >
                <Form className={css.form}>
                    <Field className={css.input} name="query" type="text" autoComplete="off" autoFocus placeholder="What inspires you?" />
                    <button type="submit" className={css.searchBtn}>
                        Search
                    </button>
                </Form>
            </Formik>
            <Toaster />
        </header>
    );
}
