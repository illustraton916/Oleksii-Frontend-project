import React, { useEffect } from "react";
import { Box, CircularProgress } from "@mui/material";
import { useAppSelector, useAppDispatch } from "../app/hooks";

const loadingList = (Component: () => JSX.Element) => () => {
  const { isProductsLoading } = useAppSelector((state) => state.products);

  if (isProductsLoading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return <Component />;
};

export default loadingList;
