import React, { useState } from "react"
import DefaultAvatar from "../../../imgs/DefaultAvatar.webp"

const Comment = ({ comment }) => {
    return (
        <div className="flex gap-4 my-6 text-white align-top">
            <img 
                src={comment.autor.profile?.avatar ? comment.author.profile.avatar : DefaultAvatar}
                alt={comment.author.name}
                className="size-10 rounded-full object-cover mt-1"
            />

            <div className="flex-1 flex flex-col gap-1">
                <div className="flex items-center gap-3">
                    <span className="font-bold text-white text-sm">
                        @{comment.author.username}
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
                onSubmit={(e) => e.preventDefault()}
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