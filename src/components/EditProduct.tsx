import React, { useState } from "react";
import { useAppSelector } from "../app/hooks";
import {
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  TextField,
  Autocomplete,
} from "@mui/material";
import { Product } from "../types/Product";
import { Formik } from "formik";
import { updateProductItem } from "../app/reducer/products";
import { useAppDispatch } from "../app/hooks";

const initialValues: Product = {
  title: "",
  category: {
    id: 0,
    name: "",
    image: "",
  },
  images: [],
  price: 0,
  description: "",
};

const EditForm = (props: {
  open?: boolean;
  handleClose: () => void;
  item: Product | null;
}) => {
  const { categories } = useAppSelector((state) => state.categories);
  const dispatch = useAppDispatch();

  if (!categories || !props.item) return null;

  return (
    <Formik
      initialValues={props.item || initialValues}
      onSubmit={(values) => {
        dispatch(updateProductItem(values));
        props.handleClose();
      }}
    >
      {({ handleSubmit, handleChange, handleBlur, values }) => (
        <Box component="form" onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Title"
            margin="normal"
            name="title"
            onBlur={handleBlur}
            onChange={handleChange}
            value={values.title}
            variant="outlined"
          />
          <Autocomplete
            fullWidth
            id="category"
            value={values.category}
            options={categories.filter(
              (product, index, self) =>
                self.findIndex((p) => p.name === product.name) === index
            )}
            isOptionEqualToValue={(option, value) => option.id === value.id}
            getOptionLabel={(option) => option.name}
            onChange={(event, value) => {
              handleChange({
                target: {
                  name: "category",
                  value: value,
                },
              });
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Category"
                margin="normal"
                name="category"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.category}
                variant="outlined"
              />
            )}
          />
          <TextField
            fullWidth
            label="Price"
            margin="normal"
            name="price"
            onBlur={handleBlur}
            onChange={handleChange}
            value={values.price}
            variant="outlined"
          />
          <TextField
            fullWidth
            label="Description"
            margin="normal"
            name="description"
            onBlur={handleBlur}
            onChange={handleChange}
            value={values.description}
            variant="outlined"
          />
          <Button fullWidth type="submit" variant="contained">
            Submit
          </Button>
        </Box>
      )}
    </Formik>
  );
};

const EditProduct = (props: { item: Product | null }) => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <Box>
      <Button
        onClick={handleClickOpen}
        variant="contained"
        color="warning"
        fullWidth
      >
        Edit Product
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Edit Product</DialogTitle>
        <DialogContent>
          <EditForm item={props.item} handleClose={handleClose} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default EditProduct;
