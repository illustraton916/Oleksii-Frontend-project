import React, { useEffect, useState } from "react";
import { Box, CircularProgress } from "@mui/material";
import { getProduct } from "./api";
import { Product } from "../types/Product";
import { useParams } from "react-router-dom";
import { setProductError } from "../app/reducer/products";

const loadingItem =
  (Component: (data: { item: Product | null }) => JSX.Element) => () => {
    const [item, setItem] = useState<Product | null>(null);
    const [isItemLoading, setIsItemLoading] = useState<boolean>(true);
    const { id } = useParams<{ id: string }>();

    useEffect(() => {
      const fetchItem = async () => {
        if (!id) return;

        try {
          const item = await getProduct(id);
          setItem(item);
        } catch (error: any) {
          setProductError({
            isError: true,
            errorMessage: error.message,
          });
        } finally {
          setIsItemLoading(false);
        }
      };
      fetchItem();
    }, []);

    if (isItemLoading) {
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

    return <Component item={item} />;
  };

export default loadingItem;
