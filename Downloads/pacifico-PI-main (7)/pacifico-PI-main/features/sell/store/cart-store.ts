import { create } from "zustand";
import { CartState } from "../types/cart";
import { Product } from "../types/product";

export const useCartStore = create<CartState>((set) => ({
  cart: [],

  // Añadir al carrito (suma 1 por defecto o la cantidad especificada)
  addToCart: (product: Product, amount = 1) =>
    set((state) => {
      const existingItem = state.cart.find(
        (item) => item.product.inventario_id === product.inventario_id
      );

      if (existingItem) {
        return {
          cart: state.cart.map((item) =>
            item.product.inventario_id === product.inventario_id
              ? { ...item, quantity: item.quantity + amount }
              : item
          ),
        };
      }

      return { cart: [...state.cart, { product, quantity: amount }] };
    }),

  // Establecer una cantidad exacta (mínimo 1)
  setQuantity: (productId: number, quantity: number) =>
    set((state) => ({
      cart: state.cart.map((item) =>
        item.product.inventario_id === productId
          ? { ...item, quantity: Math.max(1, quantity) }
          : item
      ),
    })),

  // Remover una unidad del carrito
  removeFromCart: (productId: number) =>
    set((state) => {
      const existingItem = state.cart.find(
        (item) => item.product.inventario_id === productId
      );

      if (existingItem?.quantity === 1) {
        return {
          cart: state.cart.filter(
            (item) => item.product.inventario_id !== productId
          ),
        };
      }

      return {
        cart: state.cart.map((item) =>
          item.product.inventario_id === productId
            ? { ...item, quantity: item.quantity - 1 }
            : item
        ),
      };
    }),

  // Eliminar un producto completo
  removeProductCompletely: (productId: number) =>
    set((state) => ({
      cart: state.cart.filter(
        (item) => item.product.inventario_id !== productId
      ),
    })),

  // Vaciar carrito
  clearCart: () => set({ cart: [] }),
}));