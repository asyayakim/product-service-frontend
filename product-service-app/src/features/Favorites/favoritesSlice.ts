import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type FavoriteItem = {
  productId: number;
  imageUrl: string;
  productName: string;
  brand: string;
  unitPrice: number;
  store: { name: string; logo: string };
};

type FavoritesState = {
  items: FavoriteItem[];
};

const initialState: FavoritesState = {
  items: [],
};

const favoritesSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    addToFavorites: (state, action: PayloadAction<FavoriteItem>) => {
      if (!state.items.some((i) => i.productId === action.payload.productId)) {
        state.items.push(action.payload);
      }
    },
    removeFromFavorites: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter((i) => i.productId !== action.payload);
    },
  },
});

export const { addToFavorites, removeFromFavorites } = favoritesSlice.actions;
export default favoritesSlice.reducer;
