import BlogCategoriesCard from "./BlogCategoriesCard";

const BlogCategoriesGrid = ({ Categories }) => {
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
    </div>
  );
};

export default BlogCategoriesGrid;
