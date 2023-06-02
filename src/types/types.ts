export interface FilterProducts {
  title: string | null | undefined;
  price_min: number;
  price_max: number;
  categoryId: number | null | undefined;
}

export interface RegisterProps {
  email: string;
  password: string;
  name: string;
  loginAfter: boolean | undefined;
}

export interface LoginProps {
  email: string;
  password: string;
}

export interface LoginResponse {
  access_token: string;
  refresh_token: string;
}

export interface ApplicationState {
  isAppLoading: boolean;
  isAppError: boolean;
  appErrorMessage: string | null;
}
