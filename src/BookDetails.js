import React, { useState } from "react";
import { Formik } from 'formik'
import './BookDetails.css';
import { bookYupSchema, toStandardTime } from "./validationTools";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import DatePicker from '@mui/lab/DatePicker'
import { useHistory } from "react-router-dom";


const BookDetails = ({ startingMode, book, action }) => {
    const [mode, setMode] = useState(startingMode);
    const history = useHistory();
    let message = "";
    let inputProps = {}
    let hideID = false;
    if (mode === "view") {
        message = `Pregled ${book.title} ${book.author}`;
        inputProps = { readOnly: true };
    } else if (mode === "edit") {
        message = `Izmena ${book.title} ${book.author}`;
    } else if (mode === "create") {
        message = "Postavljanje nove knjige";
        hideID = true;
    }
    return <div className="formContent">
        <h3>{message}</h3>
        <Formik
            initialValues={book}
            validationSchema={bookYupSchema}
            onSubmit={(values, { setSubmitting }) => {
                const rez = action(values);
                setSubmitting(false);
                history.go(-1);
            }}
        >
            {({
                values,
                errors,
                touched,
                handleChange,
                handleBlur,
                handleSubmit,
                setFieldValue,
                setFieldTouched,
                validateField,
                isSubmitting
            }) => (
                <form onSubmit={handleSubmit}>
                    {hideID || <TextField
                        fullWidth
                        margin="normal"
                        name="id"
                        label="Id"
                        value={values.id}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={touched.id && Boolean(errors.id)}
                        helperText={touched.id && errors.id}
                        InputProps={{ readOnly: true }}
                        variant="outlined"
                    />}
                    <TextField
                        fullWidth
                        margin="normal"
                        name="title"
                        label="Naziv knjige"
                        value={values.title}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={touched.title && Boolean(errors.title)}
                        helperText={touched.title && errors.title}
                        variant="outlined"
                        InputProps={inputProps}
                    />
                    <TextField
                        fullWidth
                        margin="normal"
                        name="author"
                        label="Autori"
                        value={values.author}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={touched.author && Boolean(errors.author)}
                        helperText={touched.author && errors.author}
                        variant="outlined"
                        InputProps={inputProps}
                        multiline
                        maxRows={4}
                    />

                    <TextField
                        fullWidth
                        margin="normal"
                        name="genre"
                        label="Zanr"
                        value={values.genre}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={touched.genre && Boolean(errors.genre)}
                        helperText={touched.genre && errors.genre}
                        variant="outlined"
                        InputProps={inputProps}
                    />

                    <DatePicker
                        margin="normal"
                        name="publishDate"
                        label="Objavljena:"
                        value={values.publishDate}
                        readOnly={inputProps.readOnly ? true : false}
                        onChange={(e) => {
                            setFieldValue("publishDate", toStandardTime(e));
                            setFieldTouched("publishDate", true, true);
                            validateField("publishDate");
                        }}
                        onBlur={handleBlur}
                        renderInput={(params) => <TextField {...params} />}
                    />
                    <span>
                        {(touched.publishDate && Boolean(errors.publishDate)) ? errors.publishDate : ""}
                    </span><br />

                    <TextField
                        fullWidth
                        margin="normal"
                        name="rating"
                        label="Ocena:"
                        value={values.rating}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={touched.rating && Boolean(errors.rating)}
                        helperText={touched.rating && errors.rating}
                        variant="outlined"
                    />
                    <TextField
                        fullWidth
                        margin="normal"
                        name="isbn"
                        label="isbn:"
                        value={values.isbn}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={touched.isbn && Boolean(errors.isbn)}
                        helperText={touched.isbn && errors.isbn}
                        variant="outlined"
                    />
                    <TextField
                        fullWidth
                        margin="normal"
                        name="available"
                        label="dostupno:"
                        value={values.available}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={touched.available && Boolean(errors.available)}
                        helperText={touched.available && errors.available}
                        variant="outlined"
                    />
                    <TextField
                        fullWidth
                        margin="normal"
                        name="pages"
                        label="stranica:"
                        value={values.pages}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={touched.pages && Boolean(errors.pages)}
                        helperText={touched.pages && errors.pages}
                        variant="outlined"
                    />

                    {
                        (mode === "view") ? "" : <Button disabled={isSubmitting}
                            color="primary" variant="contained" fullWidth type="submit">Snimi</Button>
                    }
                </form>
            )}

        </Formik>
    </div>
};

BookDetails.defaultProps = {
    book: { "id": null, title: "", author: "", genre: "", publishDate: "", rating: "", isbn: "", available: "", pages: "" },
    startingMode: "view"
}

export default BookDetails;