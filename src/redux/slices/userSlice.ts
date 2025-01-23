import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  user: { id: string; name: string; email: string } | null;
}

const initialState: UserState = {
  user: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    // Action to set user data
    setUser: (state, action: PayloadAction<UserState["user"]>) => {
      state.user = action.payload;
    },

    // Action to update user data
    updateUser: (state, action: PayloadAction<Partial<UserState["user"]>>) => {
      if (state.user) {
        state.user = { ...state.user, ...action.payload };
      }
    },

    // Action to reset user data (e.g., on logout)
    resetUser: (state) => {
      state.user = null;
    },
  },
});

export const { setUser, updateUser, resetUser } = userSlice.actions;

export default userSlice.reducer;
