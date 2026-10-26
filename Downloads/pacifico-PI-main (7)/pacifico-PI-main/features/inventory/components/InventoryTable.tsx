"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { getProducts } from "@/features/sell/services/product.service";
import { Product } from "@/features/sell/types/product";
import { Edit, Ellipsis, Trash } from "lucide-react";

const InventoryTable = () => {
    const scrollbarStyles = "[&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-neutral-200 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb:hover]:bg-neutral-300";

    const { data, isLoading } = useQuery({
        queryKey: ["products"],
        queryFn: getProducts
    })

    const products = data?.flatMap((branch) => branch.productos) ?? [];

    if (isLoading) return <InventoryTableSkeleton/>;

    return (
        <div className="bg-white flex flex-col min-w-0 border border-neutral-200 rounded-lg shadow-sm overflow-hidden">
            <div className={`flex-1 overflow-y-auto overflow-x-hidden ${scrollbarStyles}`}>

                <table className="w-full table-fixed">
                    <thead className="bg-white sticky top-0 z-10 text-left text-xs text-neutral-600 tracking-wider uppercase border-b border-neutral-200 whitespace-nowrap">
                        <tr>
                            <th className="w-14 px-4 py-3">ID</th>
                            <th className="w-[clamp(160px,28vw,320px)] px-4 py-3">Producto</th>
                            <th className="w-30 px-4 py-3">Sucursal</th>
                            <th className="w-20 px-4 py-3">Stock</th>
                            <th className="hidden xl:table-cell w-30 px-4 py-3">Estatus</th>
                            <th className="w-28 px-4 py-3 text-right">Precio</th>
                            <th className="w-18 px-4 py-3 text-center">Acción</th>
                        </tr>
                    </thead>

                    <tbody className="divide-y divide-neutral-200">
                        {products.map((product: Product) => {
                            return (
                                <InventoryTableRow
                                    key={product.inventario_id}
                                    product={product}/>
                            );
                        })}
                    </tbody>
                </table>
                
            </div>
        </div>
    );
};

export default InventoryTable;

interface InventoryTableRowProps {
    product: Product;
}

export const InventoryTableRow = ({ product }: InventoryTableRowProps) => {
    return (
        <tr>
            <td className="px-4 py-3 text-xs text-neutral-600 whitespace-nowrap">
                #{product.inventario_id}
            </td>
            <td title={product.name} className="px-4 py-3">
                <div className="flex items-center justify-start gap-4">
                    <div className="h-16 w-20 rounded-lg border border-neutral-200 shadow-sm overflow-hidden">
                        <img
                            src={product.foto_url}
                            alt={product.name}
                            className="w-full h-full object-cover"
                        />
                    </div>
                    <div className="flex flex-col gap-1">
                        <p className="truncate whitespace-nowrap font-semibold">{product.name}</p>
                        <p className="text-xs text-neutral-600">Comida</p>
                    </div>
                </div>                                       
            </td>
            <td className="px-4 py-3 text-xs text-neutral-600">
                <div className="flex flex-col gap-1">
                    <p className="truncate whitespace-nowrap font-medium">Las Brisas</p>
                </div>
            </td>
            <td className="px-4 py-3 text-neutral-600 text-sm">
                {product.quantity}
            </td>
            <td className="hidden xl:table-cell px-4 py-3 text-neutral-600 text-sm">
                <StockBadge quantity={product.quantity}/>
            </td>
            <td className="px-4 py-3 text-right font-semibold text-sm">
                ${product.price.toFixed(2)}
            </td>
            <td className="px-4 py-3">
                <div className="flex justify-center items-center gap-2">
                    <DropdownActionButton/>
                </div>
            </td>
        </tr>
    )
}

interface StockBadgeProps {
    quantity: number;
}

export const StockBadge = ({ quantity } : StockBadgeProps) => {
    let badgeStyles = "";
    let dotStyles = "";
    let label = "";

    if (quantity === 0) {
        badgeStyles = 'bg-red-50 text-red-700 border-red-200';
        dotStyles = 'bg-red-500';
        label = 'Sin stock';
    } else if (quantity > 0 && quantity <= 8) {
        badgeStyles = 'bg-amber-50 text-amber-700 border-amber-200';
        dotStyles = 'bg-amber-500';
        label = 'Stock bajo';
    } else {
        badgeStyles = 'bg-emerald-50 text-emerald-700 border-emerald-200';
        dotStyles = 'bg-emerald-500';
        label = 'En stock';
    }

    return (
        <span className={`shrink-0 whitespace-nowrap flex items-center justify-center gap-2 px-1.5 py-1 border rounded-full ${badgeStyles}`}>
            <div className={`size-1.5 rounded-full ${dotStyles}`}/>
            {label}
        </span>
    )
}

export const DropdownActionButton = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [open, setOpen] = useState(false);
    
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
        if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
            setOpen(false);
        }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div className="relative shrink-0 flex justify-center items-center gap-2" ref={containerRef}>
            <motion.button
                aria-haspopup="true"
                aria-expanded={open}
                whileHover={{ 
                scaleX: 1.1, 
                scaleY: 1.1,
                borderRadius: "35%",
                }}
                whileTap={{ 
                scaleX: 0.9, 
                scaleY: 1.1, 
                borderRadius: "50%",
                }}
                transition={{ 
                type: "spring", 
                bounce: 0.6, 
                duration: 0.8
                }}
                className="bg-linear-to-b from-brand-50 to-brand-100 text-brand-700 cursor-pointer p-1 rounded-lg" onClick={() => setOpen(!open)}>
                <Ellipsis size={20}/>
            </motion.button>

            {
                open && (
                    <div
                        className="absolute right-0 -top-12 -translate-x-1/5 z-10 flex flex-col items-stretch gap-2 rounded-2xl border border-neutral-200 bg-white shadow-sm p-2 w-44 origin-top-right">
                        <button
                            className="w-full text-neutral-900 flex items-center gap-4 py-2 px-3 rounded-xl transition-colors duration-200 ease-in-out cursor-pointer hover:bg-gray-100">
                            <Edit size={18}/>
                            <span>Editar</span>
                        </button>
                        <button
                            className="w-full text-neutral-900 flex items-center gap-4 py-2 px-3 rounded-xl transition-colors duration-200 ease-in-out cursor-pointer hover:bg-red-50 hover:text-red-600">
                            <Trash size={18}/>
                            <span>Eliminar</span>
                        </button>
                    </div>
                )
            }
        </div>
    )
}

export const InventoryTableSkeleton = () => {
    return (
        <div className="h-full w-full bg-neutral-200 flex flex-col flex-1 min-h-0 min-w-0 rounded-lg shadow-sm"/>
    )
}