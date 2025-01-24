// src/redux/slices/userSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  email: string | null;
  token: string | null;
  user: Record<string, unknown> | null;
  isAuthenticated: boolean;
}

const initialState: UserState = {
  email: null,
  token: null,
  user: null,
  isAuthenticated: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    // Set user data after login or fetching user data
    setUserData: (
      state,
      action: PayloadAction<{
        email: string;
        token: string;
        user: Record<string, unknown>;
      }>
    ) => {
      state.email = action.payload.email;
      state.token = action.payload.token;
      state.user = action.payload.user;
      state.isAuthenticated = true;
    },

    // Logout user and clear all stored data
    logout: (state) => {
      state.email = null;
      state.token = null;
      state.user = null;
      state.isAuthenticated = false;
    },
  },
});

export const { setUserData, logout } = userSlice.actions;
export default userSlice.reducer;
