import CategoriesCard from "./CategoriesCard";
import { CategoriesItems } from "./CategoriesItems"

const CategoriesGrid = () => {
  return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-items-center text-white gap-8">
        {
            CategoriesItems.map((item) => {
                return (
                    <CategoriesCard
                        key={item.id}
                        CategorieIcon={item.icon}
                        CategorieImage={item.image}
                        CategorieTitle={item.title}/>
                )
            })
        }
      </div>
  );
};

export default CategoriesGrid;
