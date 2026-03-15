import { useState, useRef } from "react";
import { BlogNavbar, BlogPostsGrid, BlogSidebar } from "../../components/Blog/index";
import { usePosts } from "../../hooks/usePosts";
import { 
    MdArrowDropDown, 
    MdSentimentVeryDissatisfied, 
    MdAdd, 
    MdOutlineImage, 
    MdShortText,
    MdClose 
} from "react-icons/md";

export default function Blog() {
    const posts = usePosts() || [];
    const [categoriaActivada, setCategoriaActivada] = useState("Todas");
    const [dropdownVisible, setDropdownVisible] = useState(false);

    const [titulo, setTitulo] = useState("");
    const [descripcion, setDescripcion] = useState("");
    const [imagen, setImagen] = useState(null);
    const fileInputRef = useRef(null);

    const categorias = ["Todas", ...new Set(posts.map(post => post.category?.name).filter(Boolean))];
    const postsFinales = categoriaActivada === "Todas" ? posts : posts.filter(post => post.category?.name === categoriaActivada);

    const handleImagenChange = (e) => {
        const file = e.target.files[0];
        if (file) setImagen(URL.createObjectURL(file));
    };

    return (
        <div className="bg-black min-h-screen flex flex-col text-white font-sans">
            <BlogNavbar />
            
            <div className="flex flex-1">
                <div className="flex-none">
                    <BlogSidebar />
                </div>

                <main className="flex-1 border-l border-zinc-600 flex flex-col">
                    <div className="px-8 pt-10 pb-6">
                        <div className="grid grid-cols-3 items-center w-full">
                            <div className="w-full"></div>
                            <h3 className="text-3xl font-light text-center whitespace-nowrap">
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-orange-800 font-bold">
                                    Mis
                                </span>{" "}
                                publicaciones
                            </h3>
                            <div className="relative flex justify-end">
                                <button 
                                    onClick={() => setDropdownVisible(!dropdownVisible)} 
                                    className="flex items-center gap-2 py-2 px-4 rounded-xl border border-zinc-600 bg-zinc-900/50 hover:bg-zinc-800 cursor-pointer"
                                >
                                    <span className="text-sm">{categoriaActivada}</span>
                                    <MdArrowDropDown className={`text-xl transition-transform ${dropdownVisible ? 'rotate-180' : ''}`}/>
                                </button>
                                {dropdownVisible && (
                                    <div className="absolute top-full z-50 right-0 mt-2 w-40 rounded-xl border border-zinc-600 bg-zinc-900 shadow-2xl overflow-hidden">
                                        <ul className="p-1">
                                            {categorias.map((item, index) => (
                                                <li 
                                                    key={index} 
                                                    className={`rounded-lg px-3 py-2 cursor-pointer text-sm transition-colors ${categoriaActivada === item ? 'bg-orange-600/20 text-orange-500' : 'hover:bg-zinc-800 text-neutral-300'}`} 
                                                    onClick={() => {setCategoriaActivada(item); setDropdownVisible(false);}}
                                                >
                                                    {item}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    <hr className="border-zinc-600 border-t-2" />

                    <div className="flex-1 overflow-y-auto">
                        {postsFinales.length > 0 ? (
                            <div className="p-8">
                                <BlogPostsGrid posts={postsFinales} />
                            </div>
                        ) : (
                            <div className="flex flex-col items-center py-12 px-4">
                                <div className="text-center mb-16">
                                    <h2 className="text-3xl font-light text-neutral-400 mb-6">
                                        Por el momento no tienes publicaciones
                                    </h2>
                                    <MdSentimentVeryDissatisfied className="text-7xl text-neutral-600 mx-auto mb-4" />
                                    <p className="text-xl text-orange-500 font-medium">Empieza a publicar ahora</p>
                                    <MdArrowDropDown className="text-4xl text-neutral-700 mx-auto mt-4 animate-bounce" />
                                </div>

                                <div className="w-full max-w-2xl space-y-6 mb-20">
                                    <div className="group border-2 border-zinc-800 bg-zinc-900/20 rounded-3xl p-6 focus-within:border-orange-500 transition-all shadow-lg">
                                        <input 
                                            type="text" 
                                            placeholder="Agregar un título a la publicación" 
                                            value={titulo}
                                            onChange={(e) => setTitulo(e.target.value)}
                                            className="w-full bg-transparent text-2xl font-light outline-none placeholder:text-zinc-600"
                                        />
                                    </div>

                                    <div 
                                        onClick={() => !imagen && fileInputRef.current.click()}
                                        className={`relative group border-2 border-dashed rounded-3xl h-80 flex flex-col items-center justify-center gap-4 transition-all overflow-hidden ${imagen ? 'border-solid border-zinc-700' : 'border-zinc-800 hover:border-orange-500/50 cursor-pointer'}`}
                                    >
                                        {imagen ? (
                                            <>
                                                <img src={imagen} alt="Preview" className="w-full h-full object-cover" />
                                                <button 
                                                    onClick={(e) => { e.stopPropagation(); setImagen(null); }} 
                                                    className="absolute top-4 right-4 p-2 bg-black/60 rounded-full hover:bg-orange-600 transition-colors"
                                                >
                                                    <MdClose className="text-white" />
                                                </button>
                                            </>
                                        ) : (
                                            <>
                                                <div className="flex gap-4">
                                                    <MdAdd className="text-5xl text-zinc-600 group-hover:text-orange-500" />
                                                    <MdOutlineImage className="text-5xl text-zinc-600 group-hover:text-orange-500" />
                                                </div>
                                                <p className="text-xl font-light text-zinc-500 group-hover:text-zinc-300">Agrega una imagen a tu publicación</p>
                                            </>
                                        )}
                                        <input type="file" ref={fileInputRef} onChange={handleImagenChange} className="hidden" accept="image/*" />
                                    </div>

                                    <div className="group border-2 border-zinc-800 bg-zinc-900/10 rounded-3xl p-6 focus-within:border-orange-500 transition-all">
                                        <div className="flex items-start gap-4">
                                            <MdShortText className="text-3xl text-zinc-600" />
                                            <textarea 
                                                placeholder="Agrega una descripción a tu publicación" 
                                                value={descripcion}
                                                onChange={(e) => setDescripcion(e.target.value)}
                                                className="w-full bg-transparent h-24 outline-none resize-none placeholder:text-zinc-600 font-light text-zinc-300"
                                            />
                                        </div>
                                    </div>

                                    {(titulo || imagen || descripcion) && (
                                        <button className="w-full py-4 bg-orange-600 hover:bg-orange-700 rounded-2xl font-bold text-lg transition-all active:scale-95 shadow-xl shadow-orange-900/20">
                                            Publicar ahora
                                        </button>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                </main>
            </div>
        </div>
    );
}