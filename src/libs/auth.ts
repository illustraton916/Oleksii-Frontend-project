import axios, { AxiosError } from "axios";
import { RegisterProps, LoginProps, LoginResponse } from "../types/types";
import { User } from "../types/User";
const API_URL = "https://api.escuelajs.co/api/v1";

const TOKEN_KEY = "access_token";
const TOKEN_EXP_KEY = "refresh_exp";
const REFRESH_TOKEN_KEY = "refresh_token";

export const setAuthToken = (token: string) => {
  localStorage.setItem(TOKEN_KEY, token);
};

export const getAuthToken = () => {
  return localStorage.getItem(TOKEN_KEY);
};

export const removeAuthToken = () => {
  localStorage.removeItem(TOKEN_KEY);
};

export const setRefreshToken = (token: string) => {
  localStorage.setItem(REFRESH_TOKEN_KEY, token);
};

export const getRefreshToken = () => {
  return localStorage.getItem(REFRESH_TOKEN_KEY);
};

export const removeRefreshToken = () => {
  localStorage.removeItem(REFRESH_TOKEN_KEY);
};

export const setTokenExp = (exp: string) => {
  localStorage.setItem(TOKEN_EXP_KEY, exp);
};

export const getTokenExp = () => {
  return localStorage.getItem(TOKEN_EXP_KEY);
};

export const removeTokenExp = () => {
  localStorage.removeItem(TOKEN_EXP_KEY);
};

export const updateUser = async (user: User) => {
  const { id, name, email, role, password } = user;
  try {
    const { data } = await axios.put<User>(`${API_URL}/users/${id}`, {
      name,
      email,
      role,
      password,
    });
    return data;
  } catch (error) {
    const e = error as AxiosError;
    return e;
  }
};

export const refreshAccessToken = async () => {
  try {
    const { data } = await axios.post<LoginResponse>(
      `${API_URL}/auth/refresh-token`,
      {
        refresh_token: getRefreshToken(),
      }
    );
    const { access_token, refresh_token } = data;
    setAuthToken(access_token);
    setRefreshToken(refresh_token);
    return data;
  } catch (error) {
    const e = error as AxiosError;
    throw new Error(e.message);
  }
};

const isTokenExpired = () => {
  const tokenExp = getTokenExp();
  if (!tokenExp) {
    return true;
  }
  const now = new Date();
  const exp = new Date(tokenExp);
  return now > exp;
};

export const isUserLoggedIn = () => {
  const token = getAuthToken();
  if (!token) {
    return false;
  }
  if (isTokenExpired()) {
    return false;
  }
  return true;
};

export const loadUser = async () => {
  try {
    const { data } = await axios.get<User>(`${API_URL}/auth/profile`, {
      headers: {
        Authorization: `Bearer ${getAuthToken()}`,
      },
    });
    return data;
  } catch (error) {
    const e = error as AxiosError;
    return e;
  }
};

export const login = async (props: LoginProps) => {
  const { email, password } = props;
  try {
    const { data } = await axios.post<LoginResponse>(`${API_URL}/auth/login`, {
      email,
      password,
    });
    const { access_token, refresh_token } = data;
    setAuthToken(access_token);
    setRefreshToken(refresh_token);
    //set token exp 10 hours
    setTokenExp(new Date(Date.now() + 10 * 60 * 60 * 1000).toISOString());
    return data;
  } catch (error) {
    const e = error as AxiosError;
    if (e.response?.status === 401) {
      throw new Error("Email or password incorrect");
    }
    if (e.response?.status === 500) {
      throw new Error("Internal server error");
    }
    if (e.response?.status === 400) {
      throw new Error("Bad request");
    }
    if (e.response?.status === 404) {
      throw new Error("Not found");
    }
    if (e.response?.status === 403) {
      throw new Error("Forbidden");
    }
  }
};

export const logout = async () => {
  try {
    removeAuthToken();
    removeRefreshToken();
    removeTokenExp();
    return true;
  } catch (error) {
    return false;
  }
};

const isAvailableEmail = async (email: string) => {
  try {
    const { data } = await axios.post(`${API_URL}/users/is-available`, {
      email,
    });
    console.log(data, email);
    return data;
  } catch (error) {
    const e = error as AxiosError;
    return e;
  }
};

export const register = async (props: RegisterProps) => {
  const { email, password, name, loginAfter } = props;

  try {
    const { data } = await axios.post<User>(`${API_URL}/users/`, {
      email,
      password,
      name,
      avatar: "https://picsum.photos/200/300?grayscale",
    });
    if (loginAfter) {
      const { email, password } = data;
      if (!email || !password) {
        throw new Error("Email or password incorrect");
      }
      await login({ email, password });
      return data;
    }
    return data;
  } catch (error) {
    const e = error as AxiosError;
    if (e.response?.status === 401) {
      throw new Error("Email or password incorrect");
    }
    if (e.response?.status === 500) {
      throw new Error("Internal server error");
    }
    if (e.response?.status === 400) {
      throw new Error("Bad request");
    }
    if (e.response?.status === 404) {
      throw new Error("Not found");
    }
    if (e.response?.status === 403) {
      throw new Error("Forbidden");
    }
  }
};
