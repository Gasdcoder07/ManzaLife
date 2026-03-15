import { useCategories } from "../../hooks/useCategories";
import CategoriesCard from "./CategoriesCard";
import { CategoryIcons } from "./CategoriesItems";

const CategoriesGrid = () => {
    const categories = useCategories();

  return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-items-center text-white gap-8">
        {
            categories.map((item, index) => {
                const Icon = CategoryIcons[item.icon];

                return (
                    <CategoriesCard
                        key={index}
                        CategorieIcon={Icon}
                        CategorieImage={item.image}
                        CategorieTitle={item.name}/>
                )
            })
        }
      </div>
  );
};

export default CategoriesGrid;
