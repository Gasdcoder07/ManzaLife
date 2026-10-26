import { Search } from "lucide-react";

const ProductSearch = () => {
    return (
        <div className="relative self-start w-full sm:w-2/5">
            <Search
                size={18}
                className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400"
            />

            <input
                type="search"
                placeholder="Buscar producto..."
                aria-label="Buscar producto"
                className="w-full bg-white rounded-full py-2.5 pl-11 pr-4 text-sm text-neutral-800 shadow-sm placeholder:text-neutral-400 focus:outline-none"
            />
        </div>
    );
};

export default ProductSearch;
