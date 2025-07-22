import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  token: string | null;
  user: {
    _id: string;
    name: string;
    image: string;
    role: string;
    email: string;
    zipCode: string;
    states: string;
    address: string;
    country: string;
    phone: string;
  } | null;
}

const initialState: AuthState = {
  token: null,
  user: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (
      state,
      action: PayloadAction<{
        token: string;
        user: {
          _id: string;
          name: string;
          email: string;
          image?: string;
          role?: string;
          zipCode?: string;
          states?: string;
          address?: string;
          country?: string;
          phone?: string;
        };
      }>
    ) => {
      state.token = action.payload.token;
      state.user = {
        _id: action.payload.user?._id,
        name: action.payload.user?.name,
        email: action.payload.user?.email,
        image: action.payload.user?.image ?? "",
        role: action.payload.user?.role ?? "",
        zipCode: action.payload.user?.zipCode ?? "",
        states: action.payload.user?.states ?? "",
        address: action.payload.user?.address ?? "",
        country: action.payload.user?.country ?? "",
        phone: action.payload.user?.phone ?? "",
      };
    },
    logout: (state) => {
      state.token = null;
      state.user = null;
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;

export default authSlice.reducer;
