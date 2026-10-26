"use client";

import { useCartStore } from "../store/cart-store";
import { AnimatePresence } from "framer-motion";
import CartPanel from "./CartPanel";

const AnimatedCart = () => {
    const cart = useCartStore((state) => state.cart);

    return (
        <AnimatePresence>
            {cart.length > 0 && <CartPanel/>}
        </AnimatePresence>
    )
};

export default AnimatedCart;
