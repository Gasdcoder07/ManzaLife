import AddProductButton from "@/features/inventory/components/AddProductButton";
import InventoryTable from "@/features/inventory/components/InventoryTable";
import ProductSearch from "@/features/sell/components/ProductSearch";

const Page = () => {
    return (
        <section className="flex flex-col h-full min-h-0 overflow-hidden p-4 gap-4">
            <div className="flex items-center justify-between gap-4">
                <ProductSearch/>

                <AddProductButton/>
            </div>

            <div className="flex">
                <InventoryTable/>
            </div>
        </section>
    );
};

export default Page;
