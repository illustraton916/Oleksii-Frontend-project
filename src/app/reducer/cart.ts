import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Product } from "../../types/Product";
import { CartItem, CartState } from "../../types/Cart";

const initialState: CartState = {
  cartItems: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<Product>) => {
      const item = action.payload;
      const itemExists = state.cartItems?.find(
        (cartItem) => cartItem.item.id === item.id
      );
      if (itemExists) {
        state.cartItems?.map((cartItem) => {
          if (cartItem.item.id === item.id) {
            cartItem.quantity += 1;
          }
        });
      } else {
        state.cartItems?.push({ quantity: 1, item });
      }
    },
    removeFromCart: (state, action: PayloadAction<Product>) => {
      const item = action.payload;
      const itemExists = state.cartItems?.find(
        (cartItem) => cartItem.item.id === item.id
      );
      if (itemExists) {
        state.cartItems?.map((cartItem) => {
          if (cartItem.item.id === item.id) {
            cartItem.quantity -= 1;
          }
          if (cartItem.quantity === 0) {
            state.cartItems = state.cartItems?.filter(
              (cartItem) => cartItem.item.id !== item.id
            );
          }
        });
      }
    },
  },
});

export const { addToCart, removeFromCart } = cartSlice.actions;
export default cartSlice.reducer;
