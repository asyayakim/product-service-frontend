// import React, { createContext, useContext, useEffect, useState } from 'react';

// export type BasketItem = {
//   productId: number;
//   imageUrl: string;
//   productName: string;
//   brand?: string;
//   unitPrice: number;
//   quantity: number;
//   store?: { name: string; logo?: string };
// };

// export type FavoriteItem = Omit<BasketItem, 'quantity'>;

// type CartContextType = {
//   basket: BasketItem[];
//   favorites: FavoriteItem[];
//   addToBasket: (item: Omit<BasketItem, 'quantity'>, qty?: number) => void;
//   removeFromBasket: (productId: number) => void;
//   setQuantity: (productId: number, qty: number) => void;
//   clearBasket: () => void;
//   addToFavorites: (item: FavoriteItem) => void;
//   removeFromFavorites: (productId: number) => void;
//   clearFavorites: () => void;
// };

// const CartContext = createContext<CartContextType | undefined>(undefined);

// export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
//   const [basket, setBasket] = useState<BasketItem[]>(() => {
//     try {
//       const stored = JSON.parse(localStorage.getItem('basket') || '[]') as any[];
//        return stored.map((item: any) => ({
//         ...item,
//          quantity: item.quantity || 1 
//          }));
//     } catch {
//       return [];
//     }
//   });

//   const [favorites, setFavorites] = useState<FavoriteItem[]>(() => {
//     try {
//       return JSON.parse(localStorage.getItem('favorites') || '[]');
//     } catch {
//       return [];
//     }
//   });

//   useEffect(() => {
//     localStorage.setItem('basket', JSON.stringify(basket));
//   }, [basket]);

//   useEffect(() => {
//     localStorage.setItem('favorites', JSON.stringify(favorites));
//   }, [favorites]);

//   const addToBasket = (item: Omit<BasketItem, 'quantity'>, qty = 1) => {
//     setBasket(prev => {
//       const existing = prev.find(p => p.productId === item.productId);
//       if (existing) {
//         return prev.map(p => p.productId === item.productId ? { ...p, quantity: p.quantity + qty } : p);
//       }
//       return [...prev, { ...item, quantity: qty }];
//     });
//   };

//   const removeFromBasket = (productId: number) => {
//     setBasket(prev => prev.filter(p => p.productId !== productId));
//   };

//   const setQuantity = (productId: number, qty: number) => {
//     setBasket(prev => prev.map(p => p.productId === productId ? { ...p, quantity: Math.max(1, qty) } : p));
//   };

//   const clearBasket = () => setBasket([]);

//   const clearFavorites = () => setFavorites([]);

//   const addToFavorites = (item: FavoriteItem) => {
//     setFavorites(prev => {
//       if (prev.some(p => p.productId === item.productId)) return prev;
//       return [...prev, item];
//     });
//   };

//   const removeFromFavorites = (productId: number) => {
//     setFavorites(prev => prev.filter(p => p.productId !== productId));
//   };

//   return (
//     <CartContext.Provider value={{
//       basket,
//       favorites,
//       addToBasket,
//       removeFromBasket,
//       setQuantity,
//       clearBasket,
//       addToFavorites,
//       removeFromFavorites,
//       clearFavorites
//     }}>
//       {children}
//     </CartContext.Provider>
//   );
// };

// export function useCart() {
//   const ctx = useContext(CartContext);
//   if (!ctx) throw new Error('useCart must be used within CartProvider');
//   return ctx;
// }
