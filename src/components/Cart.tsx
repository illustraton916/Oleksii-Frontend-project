import React, { useState } from "react";
import {
  Box,
  BoxProps,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Tooltip,
  Button,
  ListItem,
  ListItemButton,
  ListItemText,
  ListItemIcon,
  Badge,
  Avatar,
  List,
} from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useAppSelector, useAppDispatch } from "../app/hooks";
import { removeFromCart } from "../app/reducer/cart";
import { Product } from "../types/Product";
import { NavigationButton } from "./CustomButtons";

const CartItem = ({
  quantity,
  item,
  handleRemoveItem,
  handleClose,
}: {
  quantity: number;
  item: Product;
  handleRemoveItem: (item: Product) => void;
  handleClose: () => void;
}) => {
  return (
    <ListItem disablePadding>
      <ListItemButton>
        <ListItemIcon>
          <NavigationButton to={`/product/${item.id}`} onClick={handleClose}>
            <Avatar src={item.images[0]} alt={item.title} />
          </NavigationButton>
        </ListItemIcon>
        <ListItemText
          primary={item.title}
          secondary={`${item.price} ${
            item.price && item.price > 0 ? "USD" : ""
          }`}
        />
        <ListItemText primary={`Quantity: ${quantity}`} />
        <Button onClick={() => handleRemoveItem(item)}>Remove</Button>
      </ListItemButton>
    </ListItem>
  );
};

const EmptyCart = () => (
  <ListItem disablePadding>
    <ListItemButton>
      <ListItemText primary="Cart is empty" />
    </ListItemButton>
  </ListItem>
);

const Total = () => {
  const { cartItems } = useAppSelector((state) => state.cart);
  const total = cartItems?.reduce((acc, item) => {
    return acc + item.item.price * item.quantity;
  }, 0);

  return (
    <ListItem disablePadding>
      <ListItemButton>
        <ListItemText
          primary="Total"
          secondary={`${total} ${total && total > 0 ? "USD" : ""}`}
        />
      </ListItemButton>
    </ListItem>
  );
};

const Cart = (props: BoxProps) => {
  const [open, setOpen] = useState(false);
  const { cartItems } = useAppSelector((state) => state.cart);
  const dispatch = useAppDispatch();
  const cartLength = cartItems?.length;
  const handleCartOpen = () => setOpen(true);
  const handleCartClose = () => setOpen(false);
  const handleRemoveItem = (item: Product) => dispatch(removeFromCart(item));

  return (
    <Box {...props}>
      <Tooltip title="Cart">
        <IconButton onClick={handleCartOpen}>
          <Badge badgeContent={cartLength} color="primary">
            <ShoppingCartIcon />
          </Badge>
        </IconButton>
      </Tooltip>
      <Dialog
        open={open}
        onClose={handleCartClose}
        aria-labelledby="cart-dialog-title"
        aria-describedby="cart-dialog-description"
        maxWidth="xs"
        fullWidth
      >
        <DialogTitle id="cart-dialog-title">Cart</DialogTitle>
        <DialogContent>
          <List>
            {cartItems && cartItems.length > 0 ? (
              cartItems.map((item) => (
                <CartItem
                  quantity={item.quantity}
                  key={`cart-item-${item.item.id}-${item.quantity}`}
                  item={item.item}
                  handleRemoveItem={handleRemoveItem}
                  handleClose={handleCartClose}
                />
              ))
            ) : (
              <EmptyCart />
            )}
            <Total />
          </List>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCartClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Cart;
