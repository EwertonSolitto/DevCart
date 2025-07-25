import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { Product } from '../models/Product';

type FavoriteStore = {
  favorites: Product[];
  toggleFavorite: (product: Product) => void;
  isFavorite: (productId: string) => boolean;
};

export const useFavoriteStore = create<FavoriteStore>()(
  persist(
    (set, get) => ({
      favorites: [],
        toggleFavorite: (product: Product) => {
        const { favorites } = get()
        const existing = favorites.find((item) => item.productId === product.productId);

        if (!existing) {
          set({ favorites: [...favorites, product] });
        } else {
          set({ favorites: favorites.filter((item) => item.productId !== product.productId)})
        }
      },
      isFavorite: (productId) => {
        return get().favorites.some((p) => p.productId === productId);
      },
    }),
    {
      name: 'favorite-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
)