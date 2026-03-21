import React, { useState } from "react"
import DefaultAvatar from "../../../imgs/DefaultAvatar.webp"
import axios from "axios"

const Comment = ({ comment }) => {

    const [content, setContent] = useState("")
    const [isPrivate, setIsPrivate] = useState(false)

    const avatarUrl = comment.author_avatar
        ? `http://127.0.0.1:8000${comment.author_avatar}`
        : DefaultAvatar

    return (
        <div className="flex gap-4 my-6 text-white align-top">
            <img 
                src={comment.author_avatar ? comment.author_avatar : DefaultAvatar}
                alt={comment.author.name}
                className="size-10 rounded-full object-cover mt-1"
            />

            <div className="flex-1 flex flex-col gap-1">
                <div className="flex items-center gap-3">
                    <span className="font-bold text-white text-sm">
                        @{comment.author_name}
                    </span>
                    <span className="text-zinc-500 text-xs">
                        {new Date(comment.created_at).toLocaleDateString()}
                    </span>
                </div>
            </div>
            <p className="text-zinc-100 text-sm leading-relaxed whitespace-pre-line">
                {comment.content}
            </p>

            <button className="w-fit text-xs text-zinc-400 mt-2 hover:text-white transition-colors font-semibold uppercase tracking-wider">
                Responder
            </button>
            {comment.replies && comment.replies.length > 0 && (
                <div className="mt-4 space-y-4">
                    {comment.replies.map(reply => (
                        <Comment key={reply.id} comment={reply} />
                    ))}
                </div>
            )}
        </div>
    )
}

const CommentSection = ({postId, comments = []}) => {
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

    console.log(comments)
    return (
        <div className="w-full text-left mt-10">
            <h4 className="text-2xl font-bold mb-8 text-white flex items-center gap-3">
                <span className="text-orange-500">
                    {comments.length}
                </span>
                Comentarios
            </h4>
            <form 
                className="mb-12 flex gap-4 items-start"
                onSubmit={handleSubmit}
            >
                <img 
                    src={DefaultAvatar} 
                    alt="Tu avatar"
                    className="size-10 rounded-full object-cover mt-1" 
                />

                <div className="flex-1 flex flex-col gap-3">
                    <textarea 
                        className="w-full bg-zinc-900/50 border border-zinc-800 rounded-lg p-4 text-white placeholder:text-zinc-600 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-all resize-none text-sm" 
                        placeholder="Añade un comentario..."
                        rows="3"
                        value={newComment}
                        onChange={(e)=>setNewComment(e.target.value)}
                    />
                    <div className="flex justify-end gap-3">
                        <button
                            type="button"
                            onClick={() => setNewComment("")}
                            className="px-5 py-2 text-zinc-400 hover:text-white rounded-full transition-all font-semibold text-sm uppercase tracking-wide"
                        >
                            Cancelar
                        </button>
                        <button 
                            type="submit"
                            disabled={!newComment.trim()} // Deshabilitar si está vacío
                            className="px-6 py-2 bg-orange-600 hover:bg-orange-700 disabled:bg-zinc-700 disabled:text-zinc-500 text-white rounded-full transition-all font-bold text-sm uppercase tracking-wide"
                        >
                            Comentar
                        </button>
                    </div>
                </div>
            </form>
            <div className="space-y-6">
                {comments.length > 0 ? (
                    comments
                        .filter(c => !c.parent)
                        .map((comment) => (
                            <Comment key={comment.id} comment={comment} />
                        ))
                ) : (
                    <p className="text-zinc-500 text-sm italic py-8 border-t border-zinc-900">
                        No hay comentarios todavía. Axl es joto
                    </p>
                )}
            </div>
        </div>
    )
}

export default CommentSection;