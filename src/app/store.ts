import { configureStore } from "@reduxjs/toolkit";

import products from "./reducer/products";
import cart from "./reducer/cart";
import categories from "./reducer/categories";
import user from "./reducer/user";

export const store = configureStore({
  reducer: { products, cart, categories, user },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
