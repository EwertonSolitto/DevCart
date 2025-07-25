import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { Product } from '../models/Product';
import { CartItem } from '../models/Cart';

type CartStore = {
  cart: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  clearCart: () => void;
  increaseQuantity: (productId: string) => void;
  decreaseQuantity: (productId: string) => void;
};

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      cart: [],
      addToCart: (product) => {
        const { cart } = get();
        const existing = cart.find((item) => item.product.productId === product.productId);

        if (existing) {
          set({
            cart: cart.map((item) =>
              item.product.productId === product.productId
                ? { ...item, quantity: item.quantity + 1 }
                : item
            ),
          });
        } else {
          set({ cart: [...cart, { product, quantity: 1 }] });
        }
      },
      removeFromCart: (productId) => {
        set({
          cart: get().cart.filter((item) => item.product.productId !== productId),
        });
      },
      clearCart: () => set({ cart: [] }),
      increaseQuantity: (productId: string) => {
      set({
        cart: get().cart.map((item) =>
          item.product.productId === productId
            ? { ...item, quantity: item.quantity + 1 }
            : item
        ),
      });
      },
      decreaseQuantity: (productId: string) => {
        set({
          cart: get().cart
            .map((item) =>
              item.product.productId === productId
                ? { ...item, quantity: item.quantity - 1 }
                : item
            )
            .filter((item) => item.quantity > 0),
        });
      },
    }),
    {
      name: "cart-storage",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
