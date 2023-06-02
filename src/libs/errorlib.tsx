import React from "react";
import { Snackbar, Alert } from "@mui/material";
import { useAppSelector, useAppDispatch } from "../app/hooks";
import { clearCategoriesError } from "../app/reducer/categories";
import { clearProductsError } from "../app/reducer/products";
import { clearUserError } from "../app/reducer/user";

export const CategoriesError = () => {
  const dispatch = useAppDispatch();
  const { isCategoriesError, categoriesErrorMessage } = useAppSelector(
    (state) => state.categories
  );

  const handleClose = () => {
    dispatch(clearCategoriesError());
  };

  return (
    <Snackbar
      open={isCategoriesError}
      autoHideDuration={6000}
      onClose={handleClose}
    >
      <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
        {categoriesErrorMessage}
      </Alert>
    </Snackbar>
  );
};

export const ProductsError = () => {
  const dispatch = useAppDispatch();
  const { isProductsError, productsErrorMessage } = useAppSelector(
    (state) => state.products
  );

  const handleClose = () => {
    dispatch(clearProductsError());
  };

  return (
    <Snackbar
      open={isProductsError}
      autoHideDuration={6000}
      onClose={handleClose}
    >
      <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
        {productsErrorMessage}
      </Alert>
    </Snackbar>
  );
};

export const UserError = () => {
  const dispatch = useAppDispatch();
  const { isUserError, userErrorMessage } = useAppSelector(
    (state) => state.user
  );

  const handleClose = () => {
    dispatch(clearUserError());
  };

  return (
    <Snackbar open={isUserError} autoHideDuration={6000} onClose={handleClose}>
      <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
        {userErrorMessage}
      </Alert>
    </Snackbar>
  );
};
