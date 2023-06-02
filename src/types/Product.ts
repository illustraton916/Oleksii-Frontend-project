import { Category } from "./Categories";

export interface Product {
  id?: number;
  title: string;
  price: number;
  description: string;
  category: Category;
  images: string[];
}

export interface ProductsState {
  products: Product[];
  isProductsLoading: boolean;
  isProductsError: boolean;
  productsErrorMessage: string | null;
}
