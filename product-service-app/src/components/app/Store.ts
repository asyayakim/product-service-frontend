import { configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from "redux-persist";
import storage from "redux-persist/lib/storage";
import basketReducer from "../../features/Basket/BasketSlice";
import favoritesReducer from "../../features/Favorites/favoritesSlice"
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

const basketPersistConfig = {
  key: "basket",
  storage,
};

const persistedBasketReducer = persistReducer(basketPersistConfig, basketReducer);

export const store = configureStore({
  reducer: {
    basket: persistedBasketReducer,
    favorites: favoritesReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;