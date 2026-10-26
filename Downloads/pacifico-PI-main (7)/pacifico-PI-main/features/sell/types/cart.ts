import { Product } from "../types/product";

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface CartState {
  cart: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: number) => void;
  removeProductCompletely: (productId: number) => void; 
  clearCart: () => void;
  setQuantity: (productId: number, quantity: number) => void;
}