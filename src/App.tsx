import React, { useEffect } from "react";
import NavBar from "./components/NavBar";
import Navigation from "./libs/navigation";
import { useAppSelector, useAppDispatch } from "./app/hooks";
import { Box, Container, CssBaseline, CircularProgress } from "@mui/material";
import { UserError, CategoriesError, ProductsError } from "./libs/errorlib";
import { fetchProducts } from "./app/reducer/products";
import { fetchCategories } from "./app/reducer/categories";
import { getUser } from "./app/reducer/user";

const Loading = ({ children }: { children: React.ReactNode }) => {
  const dispatch = useAppDispatch();
  const { isCategoriesLoading } = useAppSelector((state) => state.categories);
  const { isUserLoading } = useAppSelector((state) => state.user);

  useEffect(() => {
    dispatch(getUser());
    dispatch(fetchProducts());
    dispatch(fetchCategories());
  }, [dispatch]);

  if (isCategoriesLoading || isUserLoading) {
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

  return <>{children}</>;
};

const App = () => {
  return (
    <Box>
      <CssBaseline />
      <Loading>
        <NavBar />
        <Container>
          <Navigation />
        </Container>
      </Loading>

      <UserError />
      <CategoriesError />
      <ProductsError />
    </Box>
  );
};

export default App;
