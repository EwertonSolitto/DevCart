import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { CartItem } from "../models/Cart";
import { Order } from "../models/Order";

type OrderStore = {
  orders: Order[];
  addOrder: (items: CartItem[], total: number) => void;
  clearOrders: () => void;
};

export const useOrderStore = create<OrderStore>()(
  persist(
    (set) => ({
      orders: [],
      addOrder: (items, total) => {
        const newOrder: Order = {
          id: Date.now().toString(),
          items,
          total,
          date: new Date().toLocaleString(),
        };
        set((state) => ({
          orders: [newOrder, ...state.orders],
        }));
      },
      clearOrders: () => set({ orders: [] }),
    }),
    {
      name: 'order-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);