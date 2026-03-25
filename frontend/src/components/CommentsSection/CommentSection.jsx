import { useEffect, useState } from "react"
import { useAuth } from "../../context/AuthContext"
import { postComment } from "../../services/commentService"
import toast from 'react-hot-toast'
import Comment from "./Comment"
import DefaultAvatar from "../../../imgs/DefaultAvatar.webp"

const CommentSection = ({ postId, comments = [] }) => {
    const { user } = useAuth()
    const [newComment, setNewComment] = useState("")
    const [localComments, setLocalComments] = useState(comments);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLocalComments(comments);
    }, [comments]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!newComment.trim()) return;

        const commentPromise = postComment({
            post: postId,
            content: newComment,
        });

        toast.promise(commentPromise, {
            loading: "Publicando comentario...",
            success: "Comentario publicado!",
            error: "Error al publicar...",
        });

        try {
            setLoading(true)
            const nuevoComentario = await commentPromise;
            setLocalComments(prev => [nuevoComentario, ...prev]);

            setNewComment("");
        } catch (error) {
            console.log("Error al publicar", error)
        } finally {
            setLoading(false);
        }
    }

    // console.log(comments);
    const userAvatar = user?.avatar || DefaultAvatar;

    return (
        <div className="w-full text-left space-y-8">
            <h4 className="text-xl tracking-wider text-white flex items-center gap-3">
                <span className="text-orange-500">
                    {localComments.length}
                </span>
                Comentarios
            </h4>

            <form 
                className="flex gap-4 items-start"
                onSubmit={handleSubmit}
            >
                <img 
                    src={userAvatar} 
                    alt="Tu avatar"
                    className="size-10 rounded-full object-cover mt-1" 
                />

                <div className="flex-1 min-w-0 flex flex-col gap-4">
                    <textarea 
                        className="w-full bg-zinc-900/50 border border-zinc-800 rounded-lg p-4 text-white placeholder:text-zinc-600 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-all resize-none text-sm custom-scrollbar" 
                        placeholder="Añade un comentario..."
                        rows="3"
                        value={newComment}
                        onChange={(e)=>setNewComment(e.target.value)}
                    />
                    <div className="flex justify-end gap-4">
                        <button
                            type="button"
                            onClick={() => setNewComment("")}
                            className="px-4 sm:px-6 py-2 text-zinc-400 hover:text-white rounded-full transition-all font-semibold text-sm uppercase tracking-wide cursor-pointer"
                        >
                            Cancelar
                        </button>
                        <button 
                            type="submit"
                            disabled={!newComment.trim() || loading} // Deshabilitar si está vacío
                            className="px-4 sm:px-6 py-2 bg-orange-600 hover:bg-orange-700 disabled:bg-zinc-700 disabled:text-zinc-500 text-white rounded-full transition-all font-bold text-sm uppercase tracking-wide cursor-pointer disabled:cursor-not-allowed"
                        >
                            Comentar
                        </button>
                    </div>
                </div>
            </form>

            <hr className="border-t border-zinc-800"/>

            <div className="space-y-8 w-full">
                {
                    localComments.length > 0 ? (
                        localComments.filter(c => !c.parent).map((comment) => {
                            return (
                                <Comment
                                    key={comment.id}
                                    CommentId={comment.id}
                                    PostId={postId}
                                    AuthorAvatar={comment.author_avatar}
                                    AuthorUsername={comment.author_name}
                                    Content={comment.content}
                                    CreatedDate={comment.created_at}
                                    Replies={comment.replies}/>
                            )
                        })
                    ) : (
                        <p className="text-zinc-500 text-sm italic">No hay comentarios todavía. Axl es hermoso.</p>
                    )
                }
            </div>
        </div>
    )
}

export default CommentSection;