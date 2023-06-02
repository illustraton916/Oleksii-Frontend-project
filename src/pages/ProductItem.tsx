import React, { useState } from "react";
import {
  Box,
  Typography,
  Grid,
  styled,
  Button,
  Table,
  TableContainer,
  TableBody,
  TableCell,
  TableRow,
  CircularProgress,
} from "@mui/material";
import loadingItem from "../libs/loadingItem";
import { Product } from "../types/Product";
import Carousel from "react-material-ui-carousel";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { addToCart } from "../app/reducer/cart";
import EditProduct from "../components/EditProduct";

const Image = styled("img")({
  width: "100%",
  height: "auto",
  objectFit: "cover",
});

const Item = (props: { image: string }) => {
  const { image } = props;
  const [isLoading, setIsLoading] = useState(true);

  const handleImageLoad = () => {
    setIsLoading(false);
  };

  return (
    <>
      {isLoading && (
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            bgcolor: "rgba(0,0,0,0.5)",
          }}
        >
          <CircularProgress color="secondary" />
        </Box>
      )}
      <Image src={image} loading="lazy" onLoad={handleImageLoad} />
    </>
  );
};

const ProductItemWithLoading = (props: { item: Product | null }) => {
  const { isAdmin } = useAppSelector((state) => state.user);
  const { item } = props;
  const dispatch = useAppDispatch();
  const handleAddToCart = () => {
    if (item) dispatch(addToCart(item));
  };

  return (
    <Box sx={{ my: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        {item?.title}
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} md={4}>
          <Carousel
            autoPlay={false}
            navButtonsAlwaysVisible={true}
            sx={{
              height: "100%",
            }}
          >
            {item?.images.map((image) => (
              <Item key={image} image={image} />
            ))}
          </Carousel>
        </Grid>
        <Grid item xs={12} md={8}>
          <TableContainer>
            <Table>
              <TableBody>
                <TableRow>
                  <TableCell>Title</TableCell>
                  <TableCell>{item?.title}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Description</TableCell>
                  <TableCell>{item?.description}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Price</TableCell>
                  <TableCell>{item?.price}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Category</TableCell>
                  <TableCell>{item?.category.name}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell colSpan={2}>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={handleAddToCart}
                      fullWidth
                    >
                      Add to cart
                    </Button>
                  </TableCell>
                </TableRow>
                {isAdmin && (
                  <TableRow>
                    <TableCell colSpan={2}>
                      <EditProduct item={item} />
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
    </Box>
  );
};

const ProductItem = loadingItem(ProductItemWithLoading);

export default ProductItem;
