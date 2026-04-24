import { useState, useRef, useEffect } from "react";
import { useAllCategories, useCategories } from "../../hooks/useCategories.js";
import { postPost, updatePost } from "../../services/postService.js";
import toast from "react-hot-toast";
import { MdArrowDropDown, MdAdd, MdOutlineImage, MdShortText, MdClose, MdPublish, MdSave } from "react-icons/md";
import validateText from "../../../utils/validateText.js"
import { useNavigate } from "react-router";

export default function PostForm({ mode, PostData = null }) {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        title: "",
        content: "",
        category_id: null,
        category_name: "Seleccionar categoría",
        image: null,
        imagePreview: null,
        status: ""
    })

    useEffect(() => {
        if (mode === "edit" && PostData) {
            setFormData({
                title: PostData.title || "",
                content: PostData.content || "",
                category_id: PostData.category?.id || null,
                category_name: PostData.category?.name || "Seleccionar categoría",
                image: null,
                imagePreview: PostData.image || null,
                imageDeleted : false
            });
        }
    }, [mode, PostData]);

    const fileInputRef = useRef(null);
    const [dropdownVisible, setDropdownVisible] = useState(false);
    const {categories, loading} = useAllCategories();
    console.log(categories);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value}));
    }

    const handleImagenChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setFormData(prev => ({
                ...prev,
                image: file,
                imagePreview: URL.createObjectURL(file)
            }));
        }
    };

    const removeImage = (e) => {
        e.stopPropagation();
        setFormData(prev => ({
            ...prev,
            image: null,
            imagePreview: null,
            imageDeleted: true
        }));

        if (fileInputRef.current) fileInputRef.current.value = "";
    }

    const handleGuardarPost = async (status) => {
        if (!formData.category_id) return toast.error("Selecciona una categoría valida");
        if (!formData.title.trim()) return toast.error("El titulo es obligatorio");
        if (mode === "create" && !formData.image) return toast.error("Debes subir una foto para la publicación");
        if (!formData.content.trim()) return toast.error("La descripción no puede estar vacía");
        console.log(formData.content)
        if (validateText(formData.content)) return toast.error("Incluye malas palabras tu texto");

        const toastId = toast.loading(mode === "create" ? "Creando publicación..." : "Actualizando publicación...");

        const finalData = new FormData();

        finalData.append("title", formData.title);
        finalData.append("content", formData.content);
        finalData.append("category_id", formData.category_id);
        finalData.append("status", status);

        if (formData.image) {
            finalData.append("image", formData.image);
        }

        if (formData.imageDeleted && !formData.image) {
            finalData.append("image", "");
        }

        try {
            let response;

            if (mode === "create") {
                response = await postPost(finalData);
            } else {
                response = await updatePost(PostData.slug, finalData);
            }

            toast.success(
                mode === "create" ? "¡Post creado exitosamente!" : "Post actualizado",
                { id: toastId }
            );

            navigate(`/blog/${response.slug}`)

        } catch (error) {
            if (error.response) {
                console.error("Error en ", error.response)
                alert(`Error del backend: ${JSON.stringify(error.response.data)}`);
            } else {
                console.error(`Error al crear o actualizar el post: ${error}`)
            }
        }
    };

    return (
        <div className="flex flex-col justify-center items-center gap-4 py-12">
            <div className="flex flex-col justify-center items-center gap-4">
                <h3 className="text-center text-2xl text-orange-600 tracking-wide">
                    { mode === "create" ? "Empieza a publicar ahora" : "Edita tu publicación"}
                </h3>
                <MdArrowDropDown className="text-4xl text-neutral-700 animate-bounce transition-all duration-300 ease-in-out" />
            </div>

            <div className="w-full max-w-2xl flex flex-col gap-6">
                {/* Dropdown de Categorias */}
                <div onClick={() => setDropdownVisible(!dropdownVisible)} className="relative w-full flex justify-end">
                    <button className="bg-zinc-50 dark:bg-zinc-900/20 flex items-center justify-center gap-2 py-2 px-4 rounded-xl border-b border-neutral-800 cursor-pointer">
                        <span>{formData.category_name}</span>
                        <MdArrowDropDown className={`text-xl ${dropdownVisible ? 'rotate-180' : ''}`}/>
                    </button>

                    {/* Lista del Dropdown */}

                    {
                        dropdownVisible && (
                            <div className="absolute top-full z-10 right-0 mt-2 w-48 max-h-32 overflow-y-auto rounded-xl shadow-lg shadow-orange-600/10 border border-neutral-800 bg-zinc-900 custom-scrollbar">
                                <ul className="flex flex-col px-4 py-2 gap-2">
                                    {
                                        categories.map((item) => {
                                            return (
                                                <li
                                                    className="block rounded-lg hover:bg-zinc-800 px-2 py-1 cursor-pointer"
                                                    onClick={() => setFormData(prev => ({ ...prev, category_id: item.id, category_name: item.name}))}
                                                    key={item.id}>
                                                    <span className="text-sm">{item.name}</span>
                                                </li>
                                            )
                                        })
                                    }
                                </ul>
                            </div>
                        )
                    }

                </div>

                {/* Input de Titulo */}
                <div className="group border border-zinc-800/20 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/20 rounded-2xl px-8 py-4 focus-within:border-orange-600 transition-all duration-300 ease-in-out shadow-lg">
                    <input
                        name="title"
                        type="text"
                        placeholder="Agregar un título a la publicación"
                        value={formData.title}
                        onChange={handleChange}
                        className="w-full bg-transparent text-xl font-light outline-none placeholder:text-zinc-600"
                    />
                </div>

                {/* Input de Imagen */}
                <div
                    onClick={() => !formData.imagePreview && fileInputRef.current.click()}
                    className={`bg-zinc-50 dark:bg-transparent relative group border-2 border-dashed rounded-2xl h-80 flex flex-col items-center justify-center gap-4 transition-all overflow-hidden ${formData.imagePreview ? "border-solid border-zinc-700" : "border-zinc-800/20 dark:border-zinc-800 hover:border-orange-500/50 cursor-pointer"}`}
                >
                    {formData.imagePreview ? (
                        <>
                            <img
                                src={formData.imagePreview}
                                alt="Preview"
                                className="w-full h-full object-cover select-none"
                            />
                            <button
                                onClick={removeImage}
                                className="absolute top-4 right-4 p-2 bg-zinc-950/80 rounded-full hover:bg-orange-600 duration-300 ease-in-out transition-colors cursor-pointer"
                            >
                                <MdClose className="text-white" />
                            </button>
                        </>
                    ) : (
                        <>
                            <div className="flex gap-4">
                                <MdAdd className="text-4xl text-zinc-600 group-hover:text-orange-600" />
                                <MdOutlineImage className="text-4xl text-zinc-600 group-hover:text-orange-600" />
                            </div>
                            <p className="text-lg font-light text-zinc-500 group-hover:text-white text-center">
                                Agrega una imagen a tu publicación
                            </p>
                        </>
                    )}
                    <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleImagenChange}
                        className="hidden"
                        accept="image/*"
                    />
                </div>

                {/* TextArea */}
                <div className="group border-2 border-zinc-800/20 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/10 rounded-2xl p-6 focus-within:border-orange-600 transition-all duration-300 ease-in-out">
                    <div className="flex items-start">
                        <MdShortText className="text-3xl text-zinc-600" />
                        <textarea
                            name="content"
                            placeholder="Agrega una descripción a tu publicación"
                            value={formData.content}
                            onChange={handleChange}
                            className="w-full px-4 bg-transparent h-24 outline-none resize-none placeholder:text-zinc-600 font-light text-white custom-scrollbar"
                        />
                    </div>
                </div>

                <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
                    <button onClick={() => handleGuardarPost("draft")} className="border border-zinc-800 flex justify-center items-center gap-4 bg-zinc-50 dark:bg-zinc-900/60 px-5 py-2 w-full cursor-pointer transition-all duration-300 ease-in-out hover:-translate-y-1">
                        <span>Guardar borrador</span>
                        <MdSave/>
                    </button>
                    <button onClick={() => handleGuardarPost("published")} className="bg-orange-600 flex justify-center items-center gap-4 px-5 py-2 w-full cursor-pointer hover:text-zinc-950 transition-all duration-300 ease-in-out hover:-translate-y-1">
                        <span>Publicar ahora</span>
                        <MdPublish/>
                    </button>
                </div>
            </div>
        </div>
    );
}
