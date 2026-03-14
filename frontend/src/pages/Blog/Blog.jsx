import { useState } from "react";
import { BlogNavbar, BlogPostsGrid, BlogSidebar } from "../../components/Blog/index"
import { usePosts } from "../../hooks/usePosts";
import { MdArrowDropDown } from "react-icons/md";

export default function Blog() {
    const posts = usePosts();
    const [categoriaActivada, setCategoriaActivada] = useState("Todas");
    const categorias = ["Todas", ...new Set(posts.map(post => post.category?.name).filter(Boolean))];
    const [dropdownVisible, setDropdownVisible] = useState(false);
    const postsFinales = categoriaActivada === "Todas" ? posts : posts.filter(post => post.category?.name === categoriaActivada);

    return (
        <div className="relative bg-zinc-950 text-white h-screen w-full flex flex-col">
            <BlogNavbar />

            <section className="flex-1 flex w-full overflow-hidden">
                <BlogSidebar />

                <div className="flex-1 container mx-auto w-full px-6 md:px-12 lg:px-24 overflow-y-auto scrollbar-thin scrollbar-thumb-zinc-800 scrollbar-track-transparent scroll-smooth">
                    <div className="mt-4 flex items-center justify-between">
                        <h3 className="text-2xl font-light">
                            <span className="text-transparent bg-clip-text bg-linear-to-r from-orange-500 to-orange-800">
                                Publicaciones
                            </span>{" "}
                            recientes
                        </h3>

                        {/* Dropdown */}
                        <div
                            onClick={() => setDropdownVisible(!dropdownVisible)}
                            className="relative w-fit">
                            <button className="flex items-center justify-center gap-2 py-2 px-4 rounded-xl border-b border-neutral-800 cursor-pointer">
                                <span>{categoriaActivada}</span>
                                <MdArrowDropDown className={`text-xl ${dropdownVisible ? 'rotate-180' : ''}`}/>
                            </button>

                            {/* Lista del Dropdown */}

                            {
                                dropdownVisible && (
                                    <div className="absolute top-full z-10 right-0 mt-2 w-36 rounded-xl shadow-lg shadow-orange-600/10 border border-neutral-800 bg-zinc-900">
                                        <ul className="flex flex-col px-4 py-2 gap-2">
                                            {
                                                categorias.map((item, index) => {
                                                    return (
                                                        <li
                                                            className="block rounded-lg hover:bg-zinc-800 px-2 py-1 cursor-pointer"
                                                            onClick={() => setCategoriaActivada(item)}
                                                            key={index}>
                                                            <span className="text-sm">{item}</span>
                                                        </li>
                                                    )
                                                })
                                            }
                                        </ul>
                                    </div>
                                )
                            }
                        </div>
                    </div>

                    <BlogPostsGrid posts={postsFinales} />
                </div>
            </section>
        </div>
    );
}