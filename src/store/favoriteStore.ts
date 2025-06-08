import { create } from 'zustand';

type Product = {
  id: string;
  name: string;
  image: string;
  price: number;
  rating: number;
  description?: string;
};

type FavoriteStore = {
  favorites: Product[];
  toggleFavorite: (product: Product) => void;
  isFavorite: (productId: string) => boolean;
};

export const useFavoriteStore = create<FavoriteStore>((set, get) => ({
  favorites: [],
    toggleFavorite: (product: Product) => {
    const { favorites } = get()
    const existing = favorites.find((item) => item.id === product.id);

    if (!existing) {
      set({ favorites: [...favorites, product] });
    } else {
      set({ favorites: favorites.filter((item) => item.id !== product.id)})
    }
  },
  isFavorite: (productId) => {
    return get().favorites.some((p) => p.id === productId);
  },
}))