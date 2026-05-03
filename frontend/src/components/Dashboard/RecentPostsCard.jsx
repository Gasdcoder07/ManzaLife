import { useLanguage } from "../../context/LanguageContext";
import { Link } from "react-router-dom";
import { useState } from "react";
import { FaEye } from "react-icons/fa";
import { MdDelete, MdModeEdit } from "react-icons/md";
import DeletePostModal from "../Modals/DeletePostModal";
import { deletePost } from "../../services/postService";

const RecentPostsCard = ({ Classname, Posts, setPosts }) => {
    const { idioma } = useLanguage();
    const isEnglish = idioma === "en";

    // Modal
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    const [deleteSelectedPost, setDeleteSelectedPost] = useState(null);

    const handleDeleteConfirm = async (slug) => {
        await deletePost(slug);
        setPosts(prev => prev.filter(p => p.slug !== slug));
    }

    return (
        <div className={`${Classname} h-64 bg-[#fffbf8] dark:bg-[#0d0d0f] border border-neutral-300 dark:border-neutral-800 rounded-xl shadow-xl px-2 py-3 flex flex-col gap-2.5`}>
            <p className="text-xl px-3 font-semibold">
                {isEnglish ? 'Recent posts' : 'Publicaciones recientes'}
            </p>

            {/* Tabla */}
            <div className="flex-1 overflow-auto custom-scrollbar">
                <table className="w-full table-fixed text-left rounded overflow-hidden">
                    <thead className="bg-zinc-100 dark:bg-zinc-950 text-neutral-600 dark:text-neutral-200">
                        <tr>
                            <th className="px-3 py-1.5">
                                {isEnglish ? 'Title' : 'Titulo'}
                            </th>
                            <th className="px-3 py-1.5">
                                {isEnglish ? 'Author' : 'Autor'}
                            </th>
                            <th className="px-3 py-1.5">
                                {isEnglish ? 'Status' : 'Estado'}
                            </th>
                            <th className="px-3 py-1.5 shrink-0">
                                {isEnglish ? 'Actions' : 'Acciones'}
                            </th>
                        </tr>
                    </thead>

                    <tbody className="divide-y divide-neutral-200 dark:divide-neutral-800">
                        {
                            Posts?.map((item, index) => {
                                return (
                                    <tr key={index}>
                                        <td className="px-3 py-1.5 truncate">{item.title}</td>
                                        <td className="px-3 py-1.5 truncate">{item.author_name}</td>
                                        <td className="px-3 py-1.5 text-green-500 dark:text-green-700 truncate">{item.status}</td>
                                        <td className="px-3 py-1.5">
                                            <div className="flex items-center gap-4 overflow-x-auto whitespace-nowrap custom-scrollbar">
                                                <Link
                                                    to={`/blog/${item.slug}`}
                                                    className='flex justify-center items-center hover:text-blue-500 dark:hover:text-blue-800 transition-colors ease-in-out duration-200'>
                                                    <FaEye/>
                                                </Link>

                                                <div className="flex justify-center items-center gap-4">
                                                    <Link
                                                        className="flex justify-center"
                                                        to={`/edit-post/${item.slug}`}>
                                                        <button className="cursor-pointer transition-all duration-200 ease-in-out hover:text-yellow-600">
                                                            <MdModeEdit/>
                                                        </button>
                                                    </Link>
                                                    <button
                                                        onClick={() => {
                                                            setDeleteSelectedPost(item.slug)
                                                            setShowDeleteModal(true)
                                                        }}
                                                        className="cursor-pointer transition-all duration-200 ease-in-out hover:text-red-600">
                                                        <MdDelete/>
                                                    </button>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>

            {
                showDeleteModal && (
                    <DeletePostModal
                        postSlug={deleteSelectedPost}
                        setShowDeleteModal={setShowDeleteModal}
                        deleteConfirm={handleDeleteConfirm}/>
                )
            }
        </div>
    );
};

export default RecentPostsCard;
