import { CartItem } from "./Cart";

export type Order = {
  id: string;
  items: CartItem[];
  total: number;
  date: string;
};