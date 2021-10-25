import React, { useState } from "react";
import { Formik } from 'formik'
import './BookDetails.css';
import { customerYupSchema, toStandardTime } from "./validationTools";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import DatePicker from '@mui/lab/DatePicker'
import { useHistory } from "react-router-dom";


const BookDetails = ({ startingMode, customer: book, action }) => {
    const [mode, setMode] = useState(startingMode);
    const history = useHistory();
    let message = "";
    let inputProps = {}
    let hideID = false;
    if (mode === "view") {
        message = `Pregled ${book.firstName} ${book.lastName}`;
        inputProps = { readOnly: true };
    } else if (mode === "edit") {
        message = `Izmena ${book.firstName} ${book.lastName}`;
    } else if (mode === "create") {
        message = "Kreiranje nove musterije";
        hideID = true;
    }
    return <div className="formContent">
        <h3>{message}</h3>
        <Formik
            initialValues={book}
            validationSchema={customerYupSchema}
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
                        name="firstName"
                        label="Ime"
                        value={values.firstName}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={touched.firstName && Boolean(errors.firstName)}
                        helperText={touched.firstName && errors.firstName}
                        variant="outlined"
                        InputProps={inputProps}
                    />
                    <TextField
                        fullWidth
                        margin="normal"
                        name="lastName"
                        label="Prezime"
                        value={values.lastName}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={touched.lastName && Boolean(errors.lastName)}
                        helperText={touched.lastName && errors.lastName}
                        variant="outlined"
                        InputProps={inputProps}
                    />

                    <TextField
                        fullWidth
                        margin="normal"
                        name="email"
                        label="E-mail"
                        value={values.email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={touched.email && Boolean(errors.email)}
                        helperText={touched.email && errors.email}
                        variant="outlined"
                        InputProps={inputProps}
                    />

                    <DatePicker
                        margin="normal"
                        name="birthday"
                        label="Rodjendan:"
                        value={values.birthday}
                        readOnly={inputProps.readOnly ? true : false}
                        onChange={(e) => {
                            setFieldValue("birthday", toStandardTime(e));
                            setFieldTouched("birthday", true, true);
                            validateField("birthday");
                        }}
                        onBlur={handleBlur}
                        renderInput={(params) => <TextField {...params} />}
                    />
                    <span>
                        {(touched.birthday && Boolean(errors.birthday)) ? errors.birthday : ""}
                    </span><br />
                    <DatePicker
                        margin="normal"
                        name="joinDay"
                        label="Datum pristupa:"
                        value={values.joinDay}
                        readOnly={inputProps.readOnly ? true : false}
                        onChange={(e) => {
                            setFieldValue("joinDay", toStandardTime(e));
                            setFieldTouched("joinDay", true, true);
                            validateField("joinDay");
                        }}
                        onBlur={handleBlur}
                        renderInput={(params) => <TextField {...params} />}
                    />
                    <span>
                        {(touched.joinDay && Boolean(errors.joinDay)) ? errors.joinDay : ""}
                    </span><br />
                    <TextField
                        fullWidth
                        margin="normal"
                        name="address"
                        label="Adresa:"
                        value={values.address}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={touched.address && Boolean(errors.address)}
                        helperText={touched.address && errors.address}
                        multiline
                        maxRows={4}
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

CustomerDetails.defaultProps = {
    customer: { "id": null, firstName: "", lastName: "", birthday: "", joinDay: "", email: "", address: "" },
    startingMode: "view"
}

export default CustomerDetails;