import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { User, UserState } from "../../types/User";
import { isUserLoggedIn, loadUser, logout, updateUser } from "../../libs/auth";
import { AxiosError } from "axios";

const initialState: UserState = {
  accessToken: null,
  user: null,
  isAuth: false,
  isAdmin: false,
  isUserLoading: true,
  isUserError: false,
  userErrorMessage: null,
};

export const updateUserProfile = createAsyncThunk(
  "application/updateUserProfile",
  async (user: User) => {
    const updatedUser = await updateUser(user);
    return updatedUser;
  }
);

export const getUser = createAsyncThunk("application/getUser", async () => {
  const isAuth = isUserLoggedIn();
  if (!isAuth) return { isAuth };
  const user = await loadUser();
  return { isAuth, user };
});

export const logoutUser = createAsyncThunk("application/logout", async () => {
  return await logout();
});

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setAccessToken: (state, action: PayloadAction<string>) => {
      state.accessToken = action.payload;
    },
    setAuth: (state, action: PayloadAction<boolean>) => {
      state.isAuth = action.payload;
    },
    setError: (
      state,
      action: PayloadAction<{ isError: boolean; errorMessage: string | null }>
    ) => {
      state.isUserError = action.payload.isError;
      state.userErrorMessage = action.payload.errorMessage;
    },
    clearUserError: (state) => {
      state.isUserError = false;
      state.userErrorMessage = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUser.fulfilled, (state, action) => {
        if (action.payload instanceof AxiosError) {
          state.isUserLoading = false;
          state.isAuth = false;
          state.isUserError = true;
          state.userErrorMessage = "Something went wrong";
        } else {
          if (action.payload?.user instanceof AxiosError) {
            state.isAuth = false;
            state.isUserError = true;
            state.userErrorMessage = "Something went wrong";
          } else {
            state.isUserLoading = false;
            state.isAuth = action.payload?.isAuth ?? false;
            state.user = action.payload?.user ?? null;
            if (state.user?.role === "admin") {
              state.isAdmin = true;
            }
          }
        }
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.isAuth = false;
        state.user = null;
      })
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        if (action.payload instanceof AxiosError) {
          state.isUserError = true;
          state.userErrorMessage = action.payload.message;
        } else {
          state.user = action.payload;
          if (state.user?.role === "admin") {
            state.isAdmin = true;
          } else {
            state.isAdmin = false;
          }
        }
      });
  },
});

export const { setAccessToken, setAuth, setError, clearUserError } =
  userSlice.actions;
export default userSlice.reducer;
