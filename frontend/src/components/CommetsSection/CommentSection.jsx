import React, { useState } from "react"

const Comment = ({ comment }) => {
    return (
        <div className="ml-4 md:ml-8 border-l border-zinc-800 pl-4 my-4">
            <div className="flex items-center gap-2 mb-2">
                <span className="font-bold text-orange-500 text-sm">@{comment.author_name}</span>
                <span className="text-zinc-500 text-xs">{new Date(comment.created_at).toLocaleDateString()}</span>
            </div>
            <p className="text-zinc-300 text-sm">{comment.content}</p>

            <button className="text-xs text-zinc-500 mt-2 hover:text-orange-400 transition-colors">
                Responder
            </button>

            {comment.replies && comment.replies.map(reply => (
                <Comment key={reply.id} comment={reply} />
            ))}
        </div>
    )
}

const CommentSection = ({postId}) => {
    const [newComment, setNewComment] = useState("")

    return (
        <div className="w-full max-w-2xl mx-auto">
            <form className="mb-8">
                <textarea 
                    className="w-full bg-zinc-900 border border-zinc-800 rounded-lg p-4 text-white focus:outline-none focus:border-orange-500 transition-colors"
                    placeholder="Escribe un comentario..."
                    rows="3"
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                />
                <button className="mt-2 px-6 py-2 bg-orange-600 hover:bg-orange-700 text-white rounded-md transition-all self-end">
                    Publicar
                </button>
            </form>

            <div className="space-y-4">
                
            </div>
        </div>
    )
}

export default CommentSection;