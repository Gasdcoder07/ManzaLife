import BlogCategoriesCard from "./BlogCategoriesCard";

const BlogCategoriesGrid = ({ Categories }) => {
  return (
    <div className="h-full">
        <div className="flex flex-col py-4 gap-4 w-full">
            {
                Categories.map((Category, Index) => {
                    return (
                        <BlogCategoriesCard
                            key={Index}/>
                    )
                })
            }
        </div>
    </div>
  );
};

export default BlogCategoriesGrid;
