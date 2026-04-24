import { useRef, useState } from "react";
import BlogCategoriesGrid from "../../components/Blog/BlogCategories/BlogCategoriesGrid";
import BlogCategoriesSkeleton from "../../components/Blog/BlogCategories/BlogCategoriesSkeleton";
import { useLanguage } from "../../context/LanguageContext";
import { useCategories } from "../../hooks/useCategories";

const BlogCategories = () => {
    const { textos } = useLanguage();
    const [currentPage, setCurrentPage] = useState(1);
    const {categories, loading} = useCategories(currentPage);
    const categoriesArray = categories?.results || [];

    const topRef = useRef(null);
    const handlePageChange = (newPage) => {
        topRef.current?.scrollIntoView({ behavior: "smooth" });
        setCurrentPage(newPage);
    };

    const totalPages = categories?.count ? Math.ceil(categories.count / 8) : 1;

    if (loading) return <BlogCategoriesSkeleton/>

    console.log(categories);

  return (
    <>
        <div className="mt-4 flex items-center justify-between">
            <h3 className="text-2xl font-light">
                {textos.main_blog.categories.subtitle}{" "}
                <span className="text-transparent bg-clip-text bg-linear-to-r from-orange-500 to-orange-800">
                    {textos.main_blog.categories.title}
                </span>
            </h3>
        </div>
        <BlogCategoriesGrid
            Categories={categoriesArray}
            CurrentPage={currentPage}
            TotalPages={totalPages}
            OnPageChange={setCurrentPage}/>
    </>
  );
};

export default BlogCategories;