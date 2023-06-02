import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { categoriesState, Category } from "../../types/Categories";
import { getCategories } from "../../libs/api";
import { AxiosError } from "axios";

const initialState: categoriesState = {
  categories: [],
  isCategoriesLoading: true,
  isCategoriesError: false,
  categoriesErrorMessage: null,
};

export const fetchCategories = createAsyncThunk(
  "products/fetchCategories",
  async () => {
    return await getCategories();
  }
);

const categoriesSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {
    clearCategoriesError: (state) => {
      state.isCategoriesError = false;
      state.categoriesErrorMessage = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      fetchCategories.fulfilled,
      (state, action: PayloadAction<Category[] | AxiosError>) => {
        if (action.payload instanceof AxiosError) {
          state.isCategoriesError = true;
          state.categoriesErrorMessage = action.payload.message;
          state.isCategoriesLoading = false;
        } else {
          state.categories.push(...action.payload);
          state.isCategoriesLoading = false;
        }
      }
    );
  },
});

export const { clearCategoriesError } = categoriesSlice.actions;
export default categoriesSlice.reducer;
