import { createContext } from 'react';
import type { BasketItem, FavoriteItem } from '../CartContext';

export const CartContext = createContext({
    favorites: [] as FavoriteItem[],
    basket: [] as BasketItem[],
    addToBasket: jest.fn(),
    removeFromBasket: jest.fn(),
    updateQuantity: jest.fn(),
    clearBasket: jest.fn(),
    addToFavorites: jest.fn(),
    removeFromFavorites: jest.fn(),
    clearFavorites: jest.fn(),
});

export const useCart = () => ({
    favorites: [] as FavoriteItem[],
    basket: [] as BasketItem[],
    addToBasket: jest.fn(),
    removeFromBasket: jest.fn(),
    updateQuantity: jest.fn(),
    clearBasket: jest.fn(),
    addToFavorites: jest.fn(),
    removeFromFavorites: jest.fn(),
    clearFavorites: jest.fn(),
});
