import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type User = {
    id: number;
    username: string;
    email: string;
    role: string;
    token: string;
    favorites: number[];
    basket: number[];
};

export type UserState = {
  user: User | null;
};

const initialState: UserState = {
  user: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },
    logout: (state) => {
      state.user = null;
      },
    updateFavorites: (state, action: PayloadAction<number[]>) => {
      if (state.user) {
        state.user.favorites = action.payload;
      }
    },
    updateBasket: (state, action: PayloadAction<number[]>) => {
      if (state.user) {
        state.user.basket = action.payload;
      }
    },
  },

});

export const { login, logout, updateFavorites, updateBasket } = userSlice.actions;
export default userSlice.reducer;
