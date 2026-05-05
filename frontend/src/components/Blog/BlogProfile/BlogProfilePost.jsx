import { Link } from "react-router-dom";
import { formatDate } from "../../../../utils/formatDate";
import { MdDelete, MdModeEdit } from "react-icons/md";

const statusMap = {
    published: {
        "en" : "Published",
        "es" : "Publicado"
    }
};

const BlogProfilePost = ({ idioma, IsAuthorized = false, PostSlug, PostImage, PostName, PostStatus, PostCreationDate, handleDelete, setPostName }) => {
  return (
    <div
        className="h-20 flex gap-4 rounded-xl overflow-hidden border border-neutral-400 dark:border-neutral-800 shadow-md"
    >
        <img
            className="w-20 sm:w-36 h-full object-cover"
            src={PostImage}
            alt={PostName}/>
        
        <div className="min-w-0 flex-1 flex flex-col justify-between p-4">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                <Link
                    to={`/blog/${PostSlug}`}
                    className="truncate italic tracking-wide hover:-translate-y-1 hover:text-orange-600 transition-all duration-200 ease-in-out">
                    <span>{PostName}</span>
                </Link>

                {
                    IsAuthorized && (
                        <div className="shrink-0 flex justify-end gap-4">
                            <Link
                                className="flex justify-center"
                                to={`/edit-post/${PostSlug}`}>
                                <button className="cursor-pointer transition-all duration-200 ease-in-out hover:text-yellow-600">
                                    <MdModeEdit/>
                                </button>
                            </Link>

                            <button
                                onClick={() => {
                                    setPostName(PostName)
                                    handleDelete(PostSlug)
                                }}
                                className="cursor-pointer transition-all duration-200 ease-in-out hover:text-red-600">
                                <MdDelete/>
                            </button>
                        </div>
                    )
                }

            </div>
            <div className="flex items-center justify-between gap-4">
                {
                    IsAuthorized && <span className="text-xs italic">{statusMap[PostStatus]?.[idioma]}</span>
                }
                <span className="text-xs italic tracking-wide text-neutral-400 dark:text-neutral-300">{formatDate(PostCreationDate)}</span>
            </div>
        </div>
    </div>
  );
};

export default BlogProfilePost;
