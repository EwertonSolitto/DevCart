import { create } from 'zustand';

type Product = {
  id: string;
  name: string;
  image: string;
  price: number;
  rating: number;
  description?: string;
};

type CartItem = {
  product: Product;
  quantity: number;
};

type CartStore = {
  cart: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  clearCart: () => void;
  increaseQuantity: (productId: string) => void;
  decreaseQuantity: (productId: string) => void;
};

export const useCartStore = create<CartStore>((set, get) => ({
  cart: [],
  addToCart: (product) => {
    const { cart } = get();
    const existing = cart.find((item) => item.product.id === product.id);

    if (existing) {
      set({
        cart: cart.map((item) =>
          item.product.id === product.id
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
      cart: get().cart.filter((item) => item.product.id !== productId),
    });
  },
  clearCart: () => set({ cart: [] }),
  increaseQuantity: (productId: string) => {
  set({
    cart: get().cart.map((item) =>
      item.product.id === productId
        ? { ...item, quantity: item.quantity + 1 }
        : item
    ),
  });
  },
  decreaseQuantity: (productId: string) => {
    set({
      cart: get().cart
        .map((item) =>
          item.product.id === productId
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0),
    });
  },
}));
