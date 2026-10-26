/* eslint-disable @next/next/no-img-element */
import { useState } from "react";
import { Plus } from "lucide-react";
import { motion } from "framer-motion";
import { Product } from "../types/product";
import { useCartStore } from "../store/cart-store";

interface ProductCardProps {
    product: Product
}

const ProductCard = ({ product } : ProductCardProps) => {
    const addToCart = useCartStore((state) => state.addToCart);
    const [imgHover, setImgHover] = useState(false);

    return (
        <div className="group h-full w-full bg-white rounded-lg border border-neutral-200 shadow-sm hover:shadow-lg p-4 flex flex-col gap-4 transition-shadow duration-200 ease-in-out overflow-hidden">
            <div className="flex gap-4 items-center">
                <img
                    onMouseEnter={() => setImgHover(true)}
                    onMouseLeave={() => setImgHover(false)}
                    className={`relative z-10 h-16 w-20 shrink-0 object-cover rounded-lg origin-top-left transition-transform duration-500 ease-out ${imgHover ? "scale-200" : "scale-100"}`}
                    src={product.foto_url}
                    alt={product.name} />

                <div className={`flex-1 min-w-0 flex flex-col transition-[padding] duration-500 ease-out ${imgHover ? "pl-20" : "pl-0"}`}>
                    <h3 className="font-semibold truncate">{product.name}</h3>
                    <span className="text-sm font-bold opacity-0 -translate-y-1 transition-all duration-300 ease-out group-hover:opacity-100 group-hover:translate-y-0">
                        ${product.price}
                    </span>
                </div>
            </div>

            <div className="h-1/2 flex flex-col gap-2">
                <div className="h-8 flex items-center">
                    <p className={`text-xs text-neutral-600 flex-1 line-clamp-2 transition-[padding] duration-500 ease-out ${imgHover ? "pl-44" : "pl-0"}`}>
                        {product.description}
                    </p>
                </div>

                <div className="flex justify-between items-center mt-2">
                    <span className="text-sm font-bold transition-opacity duration-300 ease-out group-hover:opacity-0">
                        ${product.price}
                    </span>

                    <motion.button
                        onClick={() => addToCart(product)}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        transition={{
                            type: "spring",
                            stiffness: 300,
                            damping: 20
                        }}
                        className="rounded-full p-1 bg-cyan-400 cursor-pointer"
                    >
                        <Plus size={20} className="text-white" />
                    </motion.button>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;