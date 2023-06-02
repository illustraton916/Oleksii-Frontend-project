import React from "react";
import {
  Box,
  Typography,
  IconButton,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  CircularProgress,
} from "@mui/material";
import { Product } from "../types/Product";
import { useAppSelector, useAppDispatch } from "../app/hooks";
import { addToCart } from "../app/reducer/cart";
import { NavigationButton } from "../components/CustomButtons";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import Search from "../components/Search";

const Loading = ({ children }: { children: React.ReactNode }) => {
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

  return <>{children}</>;
};

const ProductCard = (props: Product) => {
  const { title, price, description, images, category } = props;
  const dispatch = useAppDispatch();
  const handleAddToCart = () => dispatch(addToCart(props));
  return (
    <Card>
      <CardMedia component="img" height="140" image={images[0]} alt={title} />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          <b>{title.length > 20 ? title.substring(0, 20) + "..." : title}</b>
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {description.length > 50
            ? description.substring(0, 50) + "..."
            : description}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          <b>Category:</b> {category.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          <b>Price:</b> {price} {price && price > 0 ? "USD" : ""}
        </Typography>
      </CardContent>
      <CardActions>
        <IconButton aria-label="add to cart" onClick={handleAddToCart}>
          <AddShoppingCartIcon />
        </IconButton>
        <NavigationButton to={`/product/${props.id}`}>
          <Typography variant="body1" component="div">
            View
          </Typography>
        </NavigationButton>
      </CardActions>
    </Card>
  );
};

const ProductList = () => {
  const { products } = useAppSelector((state) => state.products);
  const sortedProducts = [...products]
    .filter(
      (product, index, self) =>
        self.findIndex((p) => p.title === product.title) === index
    )
    .sort((a, b) => a.title.localeCompare(b.title));

  return (
    <Box sx={{ my: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Product List
      </Typography>
      <Search />
      <Loading>
        <Grid container spacing={2}>
          {sortedProducts.map((product) => (
            <Grid item xs={12} sm={4} md={3} key={product.id}>
              <ProductCard {...product} />
            </Grid>
          ))}
        </Grid>
      </Loading>
    </Box>
  );
};

export default ProductList;
