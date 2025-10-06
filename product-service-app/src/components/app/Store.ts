import { configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from "redux-persist";
import storage from "redux-persist/lib/storage";
import basketReducer from "../../features/Basket/basketSlice";
import favoritesReducer from "../../features/Favorites/favoritesSlice"
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import userReducer from "../../features/User/userSlice";

const userPersistConfig = {
  key: "user",
  storage,
};

const persistedUserReducer = persistReducer(userPersistConfig, userReducer);

const basketPersistConfig = {
  key: "basket",
  storage,
};

const persistedBasketReducer = persistReducer(basketPersistConfig, basketReducer);

export const store = configureStore({
  reducer: {
    basket: persistedBasketReducer,
    favorites: favoritesReducer,
    user: persistedUserReducer,
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