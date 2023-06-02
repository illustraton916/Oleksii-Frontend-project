import { Product } from "./Product";

export interface CartItem {
  quantity: number;
  item: Product;
}

export interface CartState {
  cartItems: CartItem[] | null | undefined;
}
