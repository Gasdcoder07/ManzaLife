import { useRef, useState, useEffect } from "react";
import { BlogPostsGrid } from "../../components/Blog/index";
import { usePosts } from "../../hooks/usePosts";
import { MdArrowDropDown } from "react-icons/md";
import BlogHomeSkeleton from "../../components/Blog/BlogPosts/BlogHomeSkeleton";
import { useLanguage } from "../../context/LanguageContext";
import PaginationControls from "../../components/Blog/PaginationControls";

export default function Blog() {
    const { textos, idioma } = useLanguage();

    const [currentPage, setCurrentPage] = useState(1);
    const [dropdownVisible, setDropdownVisible] = useState(false);
    const [categoriaActivada, setCategoriaActivada] = useState("Todas");

    const topRef = useRef(null);
    const dropdownRef = useRef(null);

    const { posts, loading } = usePosts(currentPage);
    const postsArray = posts?.results || [];
    const totalPages = posts?.count ? Math.ceil(posts.count / 8) : 1;

    const categorias = [
        "Todas",
        ...new Set(postsArray.map(post => post.category_name).filter(Boolean))
    ];

    const postsFinales =
        categoriaActivada === "Todas"
            ? postsArray
            : postsArray.filter(post => post.category_name === categoriaActivada);

    const handlePageChange = (newPage) => {
        topRef.current?.scrollIntoView({ behavior: "smooth" });
        setCurrentPage(newPage);
    };

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
                
               
                <h3 className="text-2xl font-light">
                    {idioma === "en" ? (
                        <>
                            {textos?.main_blog?.home?.subtitle}{" "}
                            <span className="text-transparent bg-clip-text bg-linear-to-r from-orange-500 to-orange-800">
                                {textos?.main_blog?.home?.title}
                            </span>
                        </>
                    ) : (
                        <>
                            <span className="text-transparent bg-clip-text bg-linear-to-r from-orange-500 to-orange-800">
                                {textos?.main_blog?.home?.title}
                            </span>{" "}
                            {textos?.main_blog?.home?.subtitle}
                        </>
                    )}
                </h3>

                {/* Dropdown */}
                <div
                    ref={dropdownRef}
                    onClick={() => setDropdownVisible(!dropdownVisible)}
                    className="bg-zinc-50 dark:bg-transparent relative w-fit"
                >
                    <button className="flex items-center justify-center gap-2 py-2 px-4 rounded-xl border-b border-neutral-800 cursor-pointer">
                        <span>{categoriaActivada}</span>
                        <MdArrowDropDown
                            className={`text-xl ${dropdownVisible ? "rotate-180" : ""}`}
                        />
                    </button>

                    {/* Lista */}
                    {dropdownVisible && (
                        <div className="absolute top-full z-10 right-0 mt-2 w-48 max-h-32 overflow-y-auto rounded-xl shadow-lg shadow-orange-600/10 border border-neutral-800 bg-zinc-50 dark:bg-zinc-900 custom-scrollbar">
                            <ul className="flex flex-col px-4 py-2 gap-2">
                                {categorias.map((item, index) => (
                                    <li
                                        key={index}
                                        className="block rounded-lg hover:bg-black/5 dark:hover:bg-zinc-800 px-2 py-1 cursor-pointer"
                                        onClick={() => setCategoriaActivada(item)}
                                    >
                                        <span className="text-sm">{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
            </div>

            <BlogPostsGrid
                posts={postsFinales}
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
            />
        </div>
    );
}
