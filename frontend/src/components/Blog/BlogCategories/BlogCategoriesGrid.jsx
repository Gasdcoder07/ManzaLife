import PaginationControls from "../PaginationControls";
import BlogCategoriesCard from "./BlogCategoriesCard";

const BlogCategoriesGrid = ({ Categories, CurrentPage, TotalPages, OnPageChange }) => {
  return (
    <div className="h-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 py-4 gap-4 w-full">
            {
                Categories.map((Category, Index) => {
                    return (
                        <BlogCategoriesCard
                            key={Index}
                            nombre={Category.name}
                            imagen={Category.image}/>
                    )
                })
            }
        </div>

        <PaginationControls
            currentPage={CurrentPage}
            totalPages={TotalPages}
            onPageChange={OnPageChange}/>
    </div>
  );
};

export default BlogCategoriesGrid;
