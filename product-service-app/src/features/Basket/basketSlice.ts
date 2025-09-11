import { createSlice, PayloadAction } from "@reduxjs/toolkit";


type BasketItem = {
  productId: number;
  imageUrl: string;
  productName: string;
  brand?: string;
  unitPrice: number;
  quantity: number;
  store?: { name: string; logo?: string };
}

type BasketState = {
    items: BasketItem[],
}

const initialState: BasketState = {
    items: []
}

const BasketSlice = createSlice({
    name: "basket", 
    initialState,
    reducers: {
        addToBasket: (state, action: PayloadAction<BasketItem>) => {
          
          const existing = state.items.find(i=> i.productId === action.payload.productId);
          if (existing) {
            existing.quantity += action.payload.quantity;
          }
          else {
            state.items.push(action.payload);
          }
        },
        removeItem: (state, action: PayloadAction<BasketItem>) => {
            const existing = state.items.find(i => i.productId === action.payload.productId);
            if (existing){
                existing.quantity -= action.payload.quantity;
                if (existing.quantity == 1) {
                    state.items.filter(i => i.productId !== action.payload.productId);
                }
               
            }
        },
        clearBasket: (state) =>
        {
            state.items = [];
        },
    }
})
export const {clearBasket, addToBasket, removeItem} = BasketSlice.actions;
export default BasketSlice.reducer;