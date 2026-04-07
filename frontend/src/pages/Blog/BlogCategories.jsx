import BlogCategoriesGrid from "../../components/Blog/BlogCategories/BlogCategoriesGrid";
import BlogCategoriesSkeleton from "../../components/Blog/BlogCategories/BlogCategoriesSkeleton";
import { useCategories } from "../../hooks/useCategories";

const BlogCategories = () => {
    const {categories, loading} = useCategories();

    if (loading) return <BlogCategoriesSkeleton/>

    console.log(categories);

  return (
    <>
        <div className="mt-4 flex items-center justify-between">
            <h3 className="text-2xl font-light">
                <span className="text-transparent bg-clip-text bg-linear-to-r from-orange-500 to-orange-800">
                    Categorias
                </span>
            </h3>
        </div>
        <BlogCategoriesGrid Categories={categories}/>
    </>
  );
};

export default BlogCategories;