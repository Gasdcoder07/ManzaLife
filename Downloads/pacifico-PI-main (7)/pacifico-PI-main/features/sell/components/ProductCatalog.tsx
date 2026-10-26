"use client";

import { useQuery } from "@tanstack/react-query";
import { getProducts } from "../services/product.service";
import ProductCard from "./ProductCard";

const scrollbarStyles = "[&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-neutral-200 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb:hover]:bg-neutral-300";

const ProductCatalog = () => {
    const { data, isLoading } = useQuery({
        queryKey: ["products"],
        queryFn: getProducts
    })

    const products = data?.flatMap((branch) => branch.productos) ?? [];

    if (isLoading) return <Skeleton/>

    return (
        <section className="flex flex-1 min-h-0 min-w-0 basis-3/4 flex-col gap-4">
            <div className={`min-h-0 flex-1 overflow-y-auto pr-4 ${scrollbarStyles}`}>
                <div className="grid grid-cols-2 gap-4">
                    {products.map((product) => {
                        return (
                            <ProductCard
                                key={product.inventario_id}
                                product={product}/>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default ProductCatalog;

const Skeleton = () => {
    return (
        <div className="flex-1 animate-pulse duration-200 ease-in-out transition-all bg-neutral-200 flex min-h-0 min-w-0 basis-3/4 rounded-lg"/>
    )
}