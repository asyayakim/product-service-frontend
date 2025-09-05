import { configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import basketReducer from "../../features/Basket/basketSlice";

const basketPersistConfig = {
  key: "basket",
  storage,
};

export const store = configureStore({
  reducer: {
    basket: persistReducer(basketPersistConfig, basketReducer),
  },
});
export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
