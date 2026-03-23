import React, { useState } from "react"
import DefaultAvatar from "../../../imgs/DefaultAvatar.webp"
import axios from "axios"
import { useAuth } from "../../context/AuthContext"

const Comment = ({ comment, depth = 0 }) => {

    const [showReply, setShowReply] = useState(false);
    const [content, setContent] = useState("")
    const [isPrivate, setIsPrivate] = useState(false)

    const avatarUrl = comment.author_avatar
        ? `http://127.0.0.1:8000${comment.author_avatar}`
        : DefaultAvatar

    return (
        <div className="flex flex-col gap-2 text-white w-full">
            <div className="w-full flex gap-4">
                <img 
                    src={comment.author_avatar ? comment.author_avatar : DefaultAvatar}
                    alt={comment.author_name}
                    className="shrink-0 size-10 rounded-full object-cover"
                />

                <div className="flex-1 min-w-0 flex flex-col gap-2">
                    <div className="flex items-center gap-4">
                        <span className="truncate font-bold text-white text-sm hover:text-orange-500 transition-all duration-200 ease-in-out cursor-pointer tracking-wider">
                            @{comment.author_name}
                        </span>
                        <span className="shrink-0 text-zinc-500 text-xs">
                            {new Date(comment.created_at).toLocaleDateString()}
                        </span>
                    </div>

                    <div className="w-full max-h-32 overflow-y-auto custom-scrollbar">
                        <p className="text-zinc-100 text-sm leading-relaxed whitespace-pre-line wrap-break-word">
                            {comment.content}
                        </p>
                    </div>

                    {
                        depth === 0 && (
                            <div className="flex justify-end">
                                <button className="w-fit text-xs text-zinc-400 mt-2 hover:text-white transition-colors font-semibold uppercase tracking-wider cursor-pointer">
                                    <span>Responder</span>
                                </button>
                            </div>
                        )
                    }
                </div>
            </div>

            {comment.replies && comment.replies.length > 0 && (
                <div className="flex flex-col gap-4 pl-8 border-l border-zinc-800">
                    <span
                        onClick={() => setShowReply(!showReply)}
                        className="text-zinc-400 text-sm hover:text-white cursor-pointer transition-all duration-200 ease-in-out">
                        { showReply ? 'Ocultar respuestas' : 'Ver respuestas'}
                    </span>
                    {
                        showReply && comment.replies.map(reply => (
                            <Comment
                                key={reply.id}
                                comment={reply}
                                depth={depth + 1}
                                />
                        ))
                    }
                </div>
            )}
        </div>
    )
}

const CommentSection = ({postId, comments = []}) => {
    const { user } = useAuth()
    const [newComment, setNewComment] = useState("")

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!newComment.trim()) return

        const token = localStorage.getItem("token")

        try {
            const response = await axios.post(
                "http://localhost:8000/api/comments/",
                {
                    post: postId,
                    content: newComment,
                },
                {
                    headers: {
                        "Authorization": `Bearer ${token}`,
                        "Content-Type": "application/json"
                    }
                }
            )
            setNewComment("")
        } catch (error) {
            console.log("Error al publicar", error)
        }
    }

    const userAvatar = user?.profile?.avatar || DefaultAvatar;

    console.log(comments)
    return (
        <div className="w-full text-left space-y-8">
            <h4 className="text-xl tracking-wider text-white flex items-center gap-3">
                <span className="text-orange-500">
                    {comments.length}
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

                <div className="flex-1 flex flex-col gap-4">
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
                            disabled={!newComment.trim()} // Deshabilitar si está vacío
                            className="px-4 sm:px-6 py-2 bg-orange-600 hover:bg-orange-700 disabled:bg-zinc-700 disabled:text-zinc-500 text-white rounded-full transition-all font-bold text-sm uppercase tracking-wide cursor-pointer disabled:cursor-not-allowed"
                        >
                            Comentar
                        </button>
                    </div>
                </div>
            </form>
            <div className="space-y-6 w-full">
                {comments.length > 0 ? (
                    comments
                        .filter(c => !c.parent)
                        .map((comment) => (
                            <Comment key={comment.id} comment={comment} />
                        ))
                ) : (
                    <p className="text-zinc-500 text-sm italic py-8 border-t border-zinc-800">
                        No hay comentarios todavía. Axl es hermoso.
                    </p>
                )}
            </div>
        </div>
    )
}

export default CommentSection;