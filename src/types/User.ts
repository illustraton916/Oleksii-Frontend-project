export interface UserState {
  accessToken: string | null;
  user: User | null;
  isAuth: boolean;
  isAdmin: boolean;
  isUserLoading: boolean;
  isUserError: boolean;
  userErrorMessage: string | null;
}

export interface User {
  id?: string;
  name: string;
  email: string;
  password?: string;
  avatar?: string;
  role?: "customer" | "admin";
  confirmPassword?: string;
}
