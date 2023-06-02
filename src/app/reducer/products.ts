import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { Product, ProductsState } from "../../types/Product";
import { FilterProducts } from "../../types/types";
import {
  getProducts,
  getFilteredProducts,
  deleteProduct,
  addProduct,
  updateProduct,
} from "../../libs/api";
import { AxiosError } from "axios";

export const initialState: ProductsState = {
  products: [],
  isProductsLoading: true,
  isProductsError: false,
  productsErrorMessage: null,
};

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async () => {
    return await getProducts();
  }
);

export const fetchFilteredProducts = createAsyncThunk(
  "products/fetchFilteredProducts",
  async (query: FilterProducts) => {
    return await getFilteredProducts(query);
  }
);

export const deleteProductItem = createAsyncThunk(
  "products/deleteProductItem",
  async (id?: number) => {
    await deleteProduct(id);
    return { id, message: "Product deleted successfully" };
  }
);

export const addProductItem = createAsyncThunk(
  "products/addProduct",
  async (product: Product) => {
    return await addProduct(product);
  }
);

export const updateProductItem = createAsyncThunk(
  "products/updateProduct",
  async (product: Product) => {
    return await updateProduct(product);
  }
);

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    updateProductList: (state, action: PayloadAction<Product>) => {
      state.products.push(action.payload);
    },
    setProductError: (
      state,
      action: PayloadAction<{ isError: boolean; errorMessage: string | null }>
    ) => {
      state.isProductsError = action.payload.isError;
      state.productsErrorMessage = action.payload.errorMessage;
    },
    clearProductsError: (state) => {
      state.isProductsError = false;
      state.productsErrorMessage = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.isProductsLoading = true;
      })
      .addCase(
        fetchProducts.fulfilled,
        (state, action: PayloadAction<Product[] | AxiosError>) => {
          if (action.payload instanceof AxiosError) {
            state.isProductsError = true;
            state.productsErrorMessage = action.payload.message;
            state.isProductsLoading = false;
          } else {
            state.products.push(...action.payload);
            state.isProductsLoading = false;
          }
        }
      )
      .addCase(fetchFilteredProducts.pending, (state) => {
        state.isProductsLoading = true;
      })
      .addCase(
        fetchFilteredProducts.fulfilled,
        (state, action: PayloadAction<Product[] | AxiosError>) => {
          if (action.payload instanceof AxiosError) {
            state.isProductsError = true;
            state.productsErrorMessage = action.payload.message;
            state.isProductsLoading = false;
          } else {
            state.products = action.payload;
            state.isProductsLoading = false;
          }
        }
      )
      .addCase(deleteProductItem.pending, (state) => {
        state.isProductsLoading = true;
      })
      .addCase(
        deleteProductItem.fulfilled,
        (state, action: PayloadAction<any>) => {
          if (action.payload instanceof AxiosError) {
            state.isProductsError = true;
            state.productsErrorMessage = action.payload.message;
            state.isProductsLoading = false;
          } else {
            state.products = state.products.filter(
              (product) => product.id !== action.payload.id
            );

            state.isProductsLoading = false;
          }
        }
      )
      .addCase(addProductItem.pending, (state) => {
        state.isProductsLoading = true;
      })
      .addCase(
        addProductItem.fulfilled,
        (state, action: PayloadAction<Product | AxiosError>) => {
          if (action.payload instanceof AxiosError) {
            state.isProductsError = true;
            state.productsErrorMessage = action.payload.message;
            state.isProductsLoading = false;
          } else {
            state.products.push(action.payload);
            state.isProductsLoading = false;
          }
        }
      )
      .addCase(updateProductItem.pending, (state) => {
        state.isProductsLoading = true;
      })
      .addCase(
        updateProductItem.fulfilled,
        (state, action: PayloadAction<any>) => {
          if (action.payload instanceof AxiosError) {
            state.isProductsError = true;
            state.productsErrorMessage = action.payload.message;
            state.isProductsLoading = false;
          } else {
            state.products = state.products.map((product) =>
              product.id === action.payload.id ? action.payload : product
            );
            state.isProductsLoading = false;
          }
        }
      );
  },
});

export const { updateProductList, clearProductsError, setProductError } =
  productsSlice.actions;
export default productsSlice.reducer;
