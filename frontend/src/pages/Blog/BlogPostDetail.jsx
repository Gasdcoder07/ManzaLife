import { useRef, useState, useEffect } from "react";
import { Link, useNavigate, useParams } from 'react-router-dom';

import { FaEllipsisVertical } from "react-icons/fa6";
import { MdDelete, MdModeEdit } from "react-icons/md";

import { useLanguage } from "../../context/LanguageContext";
import { usePost } from "../../hooks/usePosts";
import { deletePost } from "../../services/postService";
import { formatDate } from "../../../utils/formatDate";

import DefaultAvatar from "../../../imgs/DefaultAvatar.webp"
import CommentSection from "../../components/CommentsSection/CommentSection";
import BlogPostDetailSkeleton from "../../components/Blog/BlogPosts/BlogPostDetailSkeleton";
import DeletePostModal from "../../components/Modals/DeletePostModal";
import { useAuth } from "../../context/AuthContext";

const BlogPostDetail = () => {
    const { user: currentUser } = useAuth();
    const { idioma } = useLanguage();
    const isEnglish = idioma === "en";

    const { slug } = useParams();
    const navigate = useNavigate();
    const dropdownRef = useRef(null);

    const { post, loading } = usePost(slug);

    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    const handleDeleteConfirm = async (slug) => {
        try {
            await deletePost(slug);
            navigate("/blog", { replace: true });
        } catch (error) {
            console.error("Error deleting post:", error);
        }
    }

    useEffect(() => {
        if (!dropdownOpen) return;

        const handleClickOutside = (e) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(e.target)
            ) {
                setDropdownOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);

        return () =>
            document.removeEventListener("mousedown", handleClickOutside);
    }, [dropdownOpen]);

    // if (!post) return <p className="mt-4">No se pudo cargar la publicación</p>
    if (loading) return <BlogPostDetailSkeleton/>

    if (!post) {
        return (
            <div className="mt-4 flex flex-col items-center py-10">
                <h3 className="font-medium text-xl">
                    {isEnglish ? "Post not found" : "Publicación no encontrada"}
                </h3>
            </div>
        );
    }

    const isAuthorized = currentUser?.username === post.author?.username || currentUser?.isAdmin;

  return (
    <div className="m-4 flex flex-col gap-4 p-4 bg-[#fcfcfc] border border-neutral-300 dark:bg-[#0d0d0f] dark:border-neutral-800 rounded-lg shadow-md">
        <div className="rounded-xl overflow-hidden h-64 shadow-xl">
            <img
                className="object-cover h-full w-full"
                src={post?.image}
                alt={post?.title} />
        </div>
        <div>
            <div className="flex flex-col gap-8 p-4">
                <div className="flex items-start justify-between gap-4">
                    <h3 className="flex-1 min-w-0 wrap-break-word font-bold text-2xl sm:text-3xl tracking-wide">{post.title}</h3>

                    {/* Dropdown */}
                    {
                        isAuthorized && (
                            <div ref={dropdownRef} className="relative shrink-0">
                                <button
                                    className="flex justify-center items-center"
                                    onClick={(e) => {
                                        setDropdownOpen(prev => !prev);
                                    }}
                                >
                                    <FaEllipsisVertical className="text-xl cursor-pointer transition-colors duration-200 ease-in-out hover:text-orange-600"/>
                                </button>

                                {
                                    dropdownOpen && (
                                        <div className="rounded-lg border border-neutral-300 dark:border-neutral-800 p-2 absolute left-0 -translate-x-1/2 sm:-translate-x-1/3 bottom-full mb-2 w-fit bg-[#fcfcfc] dark:bg-[#0d0d0f] flex flex-col items-start gap-2 z-20">
                                            <Link
                                                to={`/edit-post/${post.slug}`}
                                                className="group flex justify-center items-center gap-2">
                                                <MdModeEdit className="group-hover:text-yellow-600"/>
                                                <span className="group-hover:text-yellow-600">
                                                    {isEnglish ? "Edit" : "Editar"}
                                                </span>
                                            </Link>

                                            <button
                                                onClick={() => setShowDeleteModal(true)}
                                                className="cursor-pointer group flex justify-center items-center gap-2">
                                                <MdDelete className="group-hover:text-red-600"/>
                                                <span className="group-hover:text-red-600">
                                                    {isEnglish ? "Delete" : "Eliminar"}
                                                </span>
                                            </button>
                                        </div>
                                    )
                                }
                            </div>
                        )
                    }
                </div>
                <div className="w-fit flex justify-between items-center gap-4 text-sm">
                    <div className="flex gap-4 justify-center items-center">
                        <img
                            className="rounded-full size-10 object-cover"
                            src={post.author.avatar ? post.author.avatar : DefaultAvatar}
                            alt={post.author.username} />
                        
                        <Link to={`/blog/profile/${post.author.username}`}
                            className="transition-all duration-200 ease-in-out hover:text-orange-600">
                            <span>
                                @{post.author.username}
                            </span>
                        </Link>
                    </div>

                    <span>{formatDate(post.created_at)}</span>
                </div>

                <p className="whitespace-pre-line text-lg font-light tracking-wider leading-relaxed wrap-break-word">{post.content}</p>
            </div>
        </div>
        <div className="my-8 max-w-xl p-4">
            <CommentSection isEnglish={isEnglish} postId={post.id} comments={post.comments}/>
        </div>

        {
            showDeleteModal && (
                <DeletePostModal
                    postName={post.title}
                    postSlug={post.slug}
                    setShowDeleteModal={setShowDeleteModal}
                    deleteConfirm={handleDeleteConfirm}/>
            )
        }
    </div>
);
};

export default BlogPostDetail;