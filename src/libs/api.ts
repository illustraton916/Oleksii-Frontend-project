import axios, { AxiosError } from "axios";
import { FilterProducts } from "../types/types";
import { Product } from "../types/Product";
const URL = "https://api.escuelajs.co/api/v1";

export const getFilteredProducts = async (query: FilterProducts) => {
  const { title, price_min, price_max, categoryId } = query;
  let url = `${URL}/products?`;
  if (title) url += `title=${title}&`;
  if (price_min) url += `price_min=${price_min}&`;
  if (price_max) url += `price_max=${price_max}&`;
  if (categoryId) url += `categoryId=${categoryId}&`;
  try {
    const { data } = await axios.get<Product[]>(url);
    return data;
  } catch (error) {
    const e = error as AxiosError;
    return e;
  }
};

export const deleteProduct = async (id?: number) => {
  try {
    if (!id) throw new Error("No id provided");
    const { data } = await axios.delete<boolean>(`${URL}/products/${id}`);
    return data;
  } catch (error) {
    const e = error as AxiosError;
    return e;
  }
};

export const updateProduct = async (product: Product) => {
  try {
    const { data } = await axios.put<Product>(
      `${URL}/products/${product.id}`,
      product
    );
    return data;
  } catch (error) {
    const e = error as AxiosError;
    return e;
  }
};

export const getProducts = async () => {
  let url = `${URL}/products`;
  try {
    const { data } = await axios.get<Product[]>(url);
    return data;
  } catch (error) {
    const e = error as AxiosError;
    return e;
  }
};

export const getProduct = async (id: string) => {
  try {
    const { data } = await axios.get(`${URL}/products/${id}`);
    return data;
  } catch (error) {
    const e = error as AxiosError;
    return e;
  }
};

export const getCategories = async () => {
  try {
    const { data } = await axios.get(`${URL}/categories`);
    return data;
  } catch (error) {
    const e = error as AxiosError;
    return e;
  }
};

export const addProduct = async (product: Product) => {
  const { title, price, description, category } = product;
  const newProduct = {
    title,
    price,
    description,
    categoryId: category.id,
    images: ["https://placeimg.com/640/480/any"],
  };
  try {
    const { data } = await axios.post<Product>(`${URL}/products/`, newProduct);
    return data;
  } catch (error) {
    const e = error as AxiosError;
    return e;
  }
};
