import { configureStore } from '@reduxjs/toolkit'
import basketReducer from '../../features/Basket/basketSlice'
export const store = configureStore({
    reducer: {
        posts: basketReducer,
    },
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;