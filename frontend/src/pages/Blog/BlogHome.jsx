import { useRef, useState, useEffect } from "react";
import { BlogPostsGrid } from "../../components/Blog/index";
import { usePosts } from "../../hooks/usePosts";
import { MdArrowDropDown } from "react-icons/md";
import BlogHomeSkeleton from "../../components/Blog/BlogPosts/BlogHomeSkeleton";
import { useLanguage } from "../../context/LanguageContext";
import { getAllCategories } from "../../services/categoryService";
import PaginationControls from "../../components/Blog/PaginationControls";

export default function Blog() {
    const { textos, idioma } = useLanguage();

    const [currentPage, setCurrentPage] = useState(1);
    const [dropdownVisible, setDropdownVisible] = useState(false);
    const [categories, setCategories] = useState([]);
    const [categoriaActivada, setCategoriaActivada] = useState(null);

    const topRef = useRef(null);
    const dropdownRef = useRef(null);

    const { posts, loading } = usePosts(currentPage, categoriaActivada);
    const postsArray = posts?.results || [];
    const totalPages = posts?.count ? Math.ceil(posts.count / 8) : 1;
    
    const handlePageChange = (newPage) => {
        topRef.current?.scrollIntoView({ behavior: "smooth" });
        setCurrentPage(newPage);
    };

    useEffect(() => {
        getAllCategories().then(data => setCategories(data));
    }, [])
    
    const categorias = [
        { name: "Todas", slug: null },
        ...categories
    ];

    const categoriaActual = categorias.find(cat => cat.slug === categoriaActivada);

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
                setDropdownVisible(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    if (loading) return <BlogHomeSkeleton />;

    return (
        <div ref={topRef} className="scroll-mt-32">
            <div className="mt-4 flex items-center justify-between">
               
                <h3 className="text-2xl">
                    {idioma === "en" ? (
                        <>
                            {textos?.main_blog?.home?.subtitle}{" "}
                            <span className="text-transparent bg-clip-text bg-linear-to-r from-orange-500 to-orange-800">
                                {textos?.main_blog?.home?.title}
                            </span>
                        </>
                    ) : (
                        <>
                            {textos?.main_blog?.home?.subtitle}{" "}
                            <span className="text-transparent bg-clip-text bg-linear-to-r from-orange-500 to-orange-800">
                                {textos?.main_blog?.home?.title}
                            </span>{" "}
                        </>
                    )}
                </h3>

                {/* Dropdown */}
                <div
                    ref={dropdownRef}
                    onClick={() => setDropdownVisible(!dropdownVisible)}
                    className="relative w-fit"
                >
                    <button className="bg-[#fffbf8] dark:bg-[#0d0d0f] flex items-center justify-center gap-2 py-2 px-4 rounded-xl border border-neutral-300 dark:border-neutral-800 cursor-pointer">
                        <span>{categoriaActual?.name || "Todas"}</span>
                        <MdArrowDropDown
                            className={`text-xl ${dropdownVisible ? "rotate-180" : ""}`}
                        />
                    </button>

                    {/* Lista */}
                    {dropdownVisible && (
                        <div className="absolute top-full z-10 right-0 mt-2 w-48 max-h-32 overflow-y-auto rounded-xl shadow-lg border border-neutral-300 dark:border-neutral-800 bg-[#fffbf8] dark:bg-[#0d0d0f] custom-scrollbar">
                            <ul className="flex flex-col px-4 py-2 gap-2">
                                {
                                    categorias.map((item, index) => (
                                    <li
                                        key={index}
                                        className="block rounded-lg hover:bg-black/5 dark:hover:bg-white/5 px-2 py-1 cursor-pointer"
                                        onClick={() => {
                                            setCategoriaActivada(item.slug)
                                            setCurrentPage(1);
                                        }}
                                    >
                                        <span className="text-sm">{item.name}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
            </div>

            <BlogPostsGrid
                posts={postsArray}
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
            />
        </div>
    );
}
