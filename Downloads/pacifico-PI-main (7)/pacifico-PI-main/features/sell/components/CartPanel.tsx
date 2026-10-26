"use client";

import { useState, useEffect } from "react";
import { Minus, Plus, Trash2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useCartStore } from "../store/cart-store";

// Subcomponente de Input con estado local para edición fluida
interface QuantityInputProps {
  quantity: number;
  onQuantityChange: (newQuantity: number) => void;
}

const QuantityInput = ({ quantity, onQuantityChange }: QuantityInputProps) => {
  const [localValue, setLocalValue] = useState<string>(quantity.toString());

  useEffect(() => {
    setLocalValue(quantity.toString());
  }, [quantity]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setLocalValue(val);

    const parsed = parseInt(val, 10);
    if (!isNaN(parsed) && parsed > 0) {
      onQuantityChange(parsed);
    }
  };

  const handleBlur = () => {
    const parsed = parseInt(localValue, 10);
    if (isNaN(parsed) || parsed < 1) {
      setLocalValue(quantity.toString());
    }
  };

  return (
    <input
      type="number"
      min="1"
      value={localValue}
      onChange={handleChange}
      onBlur={handleBlur}
      className="w-8 text-center text-xs font-bold bg-transparent border-none focus:outline-none focus:ring-1 focus:ring-cyan-500 rounded [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
    />
  );
};

const CartPanel = () => {
  const scrollbarStyles =
    "[&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-neutral-200 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb:hover]:bg-neutral-300";

  const cart = useCartStore((state) => state.cart);
  const addToCart = useCartStore((state) => state.addToCart);
  const removeFromCart = useCartStore((state) => state.removeFromCart);
  const removeProductCompletely = useCartStore(
    (state) => state.removeProductCompletely
  );
  const clearCart = useCartStore((state) => state.clearCart);
  const setQuantity = useCartStore((state) => state.setQuantity);

  const subtotal = cart.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0
  );
  const iva = subtotal * 0.16;
  const total = subtotal + iva;

  return (
    <section className="flex min-h-0 min-w-0 basis-1/4 flex-col rounded-lg border border-neutral-200 bg-white shadow-sm">
      <div className="flex flex-col min-h-0 min-w-0 h-full">
        {/* Encabezado */}
        <div className="border-b border-neutral-200 p-4 flex items-center justify-between">
          <h3 className="font-semibold">Detalles de la orden</h3>

          {cart.length > 0 && (
            <motion.button
              onClick={clearCart}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-1 text-xs text-red-500 hover:text-red-600 bg-red-50 hover:bg-red-100 px-2 py-1 rounded-md transition-colors font-medium cursor-pointer"
              title="Vaciar todo el carrito"
            >
              <Trash2 className="size-3.5" />
              <span>Vaciar</span>
            </motion.button>
          )}
        </div>

        {/* Lista de Productos */}
        <div
          className={`flex flex-col min-h-0 min-w-0 h-full p-4 overflow-y-auto gap-2 ${scrollbarStyles}`}
        >
          {cart.length === 0 ? (
            <p className="text-center text-xs text-neutral-400 py-8">
              El carrito está vacío
            </p>
          ) : (
            <AnimatePresence mode="popLayout">
              {cart.map((item) => {
                const product = item.product;

                return (
                  <motion.div
                    key={product.inventario_id}
                    initial={{ scale: 0.7, opacity: 0, y: -10 }}
                    animate={{ scale: 1, opacity: 1, y: 0 }}
                    exit={{ scale: 0.7, opacity: 0, x: 20 }}
                    transition={{
                      type: "spring",
                      stiffness: 500,
                      damping: 25,
                      mass: 0.5,
                    }}
                    className="relative flex flex-col rounded-lg border border-neutral-200 shadow-sm p-2 gap-2 group bg-white"
                  >
                    <div className="flex justify-between items-center gap-2">
                      <div className="flex items-center gap-2 flex-1 min-w-0">
                        <img
                          className="h-8 w-10 shrink-0 object-cover rounded-lg"
                          src={product.foto_url}
                          alt={product.name}
                        />
                        <div className="flex-1 min-w-0 pr-2">
                          <h3 className="text-xs font-semibold truncate">
                            {product.name}
                          </h3>
                        </div>
                      </div>

                      {/* Eliminar Producto Completo */}
                      <motion.button
                        onClick={() =>
                          removeProductCompletely(product.inventario_id)
                        }
                        whileHover={{ scale: 1.15 }}
                        whileTap={{ scale: 0.85 }}
                        className="text-neutral-400 hover:text-red-500 transition-colors p-1 rounded-md cursor-pointer"
                        title="Eliminar producto completo"
                      >
                        <Trash2 className="size-3.5" />
                      </motion.button>
                    </div>

                    <div className="mt-auto flex justify-between items-center gap-2">
                      {/* Control Numerador con Input Editable */}
                      <div className="flex items-center border border-neutral-200 bg-neutral-50 rounded-lg p-0.5 gap-0.5">
                        <motion.button
                          type="button"
                          onClick={() => removeFromCart(product.inventario_id)}
                          whileTap={{ scale: 0.85 }}
                          className="p-1 rounded-md hover:bg-white text-neutral-600 hover:text-black transition-colors cursor-pointer"
                        >
                          <Minus className="size-3" />
                        </motion.button>

                        <QuantityInput
                          quantity={item.quantity}
                          onQuantityChange={(newQty) =>
                            setQuantity(product.inventario_id, newQty)
                          }
                        />

                        <motion.button
                          type="button"
                          onClick={() => addToCart(product)}
                          whileTap={{ scale: 0.85 }}
                          className="p-1 rounded-md hover:bg-white text-neutral-600 hover:text-black transition-colors cursor-pointer"
                        >
                          <Plus className="size-3" />
                        </motion.button>
                      </div>

                      <span className="text-xs font-bold">
                        ${(product.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          )}
        </div>
      </div>

      {/* Totales y Confirmación */}
      <div className="border-t border-neutral-200 p-4 text-xs text-neutral-400 flex flex-col gap-2">
        <div className="flex justify-between items-center">
          <p>Subtotal: </p>
          <p className="text-black font-semibold">${subtotal.toFixed(2)}</p>
        </div>
        <div className="flex justify-between items-center">
          <p>IVA (16%): </p>
          <p className="text-black font-semibold">${iva.toFixed(2)}</p>
        </div>
        <div className="mt-2 flex justify-between items-center px-4 py-2 bg-cyan-50 border border-cyan-200 rounded-lg">
          <p className="text-cyan-400 text-base">Total: </p>
          <p className="text-cyan-400 font-semibold text-lg">
            ${total.toFixed(2)}
          </p>
        </div>

        <motion.button
          disabled={cart.length === 0}
          whileHover={cart.length > 0 ? { scale: 1.02 } : {}}
          whileTap={cart.length > 0 ? { scale: 0.98 } : {}}
          className="text-sm mt-2 bg-cyan-400 py-2 rounded-full px-4 text-white font-medium cursor-pointer disabled:bg-neutral-200 disabled:text-neutral-400 disabled:cursor-not-allowed transition-colors"
        >
          Confirmar orden
        </motion.button>
      </div>
    </section>
  );
};

export default CartPanel;