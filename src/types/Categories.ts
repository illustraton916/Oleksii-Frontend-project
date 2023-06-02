export interface Category {
  id: number;
  name: string;
  image: string;
}

export interface categoriesState {
  categories: Category[];
  isCategoriesLoading: boolean;
  isCategoriesError: boolean;
  categoriesErrorMessage: string | null;
}
