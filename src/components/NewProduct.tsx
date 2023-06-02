import React, { useState } from "react";
import { useAppSelector } from "../app/hooks";
import {
  Box,
  BoxProps,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  TextField,
  Autocomplete,
  styled,
} from "@mui/material";
import { Formik, FormikHelpers } from "formik";
import * as Yup from "yup";
import { Product } from "../types/Product";
import { useAppDispatch } from "../app/hooks";
import { addProductItem } from "../app/reducer/products";

const CustomField = styled(TextField)({
  marginBottom: "1rem",
});

const initialValues: Product = {
  id: Date.now(),
  title: "",
  description: "",
  price: 0,
  category: {
    id: 0,
    name: "",
    image: "",
  },
  images: [],
};

const validationSchema = Yup.object().shape({
  title: Yup.string().required("Required"),
  description: Yup.string().required("Required"),
  price: Yup.number().required("Required"),
  category: Yup.object().shape({
    id: Yup.number().required("Required"),
    name: Yup.string().required("Required"),
    image: Yup.string().required("Required"),
  }),
});

const NewProduct = (props: BoxProps) => {
  const [open, setOpen] = useState(false);
  const { categories } = useAppSelector((state) => state.categories);
  const { isAuth } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  if (!isAuth) return null;
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const onSubmit = (
    values: Product,
    { setSubmitting }: FormikHelpers<Product>
  ) => {
    dispatch(addProductItem(values));
    handleClose();
    setSubmitting(false);
  };
  const sortedCategories = [...categories]
    .filter(
      (product, index, self) =>
        self.findIndex((p) => p.name === product.name) === index
    )
    .sort((a, b) => a.name.localeCompare(b.name));

  return (
    <Box {...props}>
      <Button onClick={handleOpen}>New Product</Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>New Product</DialogTitle>
        <DialogContent>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
          >
            {({
              values,
              errors,
              touched,
              isValid,
              dirty,
              handleChange,
              handleBlur,
              handleSubmit,
              setFieldValue,
              isSubmitting,
            }) => (
              <Box component="form" onSubmit={handleSubmit}>
                <CustomField
                  fullWidth
                  id="title"
                  name="title"
                  label="Title"
                  value={values.title}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={Boolean(touched.title && errors.title)}
                  helperText={touched.title && errors.title}
                />
                <CustomField
                  fullWidth
                  id="description"
                  name="description"
                  label="Description"
                  value={values.description}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={Boolean(touched.description && errors.description)}
                  helperText={touched.description && errors.description}
                />
                <CustomField
                  fullWidth
                  id="price"
                  name="price"
                  label="Price"
                  value={values.price}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={Boolean(touched.price && errors.price)}
                  helperText={touched.price && errors.price}
                />
                <Autocomplete
                  id="category"
                  options={sortedCategories}
                  getOptionLabel={(option) => option.name}
                  onChange={(event, value) => {
                    setFieldValue("category", value);
                  }}
                  renderInput={(params) => (
                    <CustomField
                      {...params}
                      fullWidth
                      label="Category"
                      error={Boolean(touched.category && errors.category)}
                    />
                  )}
                />
                <Button
                  fullWidth
                  variant="contained"
                  color="primary"
                  type="submit"
                  disabled={isSubmitting || !isValid || !dirty}
                >
                  Submit
                </Button>
              </Box>
            )}
          </Formik>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default NewProduct;
