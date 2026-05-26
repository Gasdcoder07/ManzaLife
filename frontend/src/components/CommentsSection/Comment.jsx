import React, { useState } from "react";
import { Link } from "react-router-dom";
import Reply from "./Reply";
import toast from "react-hot-toast";
import { postComment } from "../../services/commentService";
import DefaultAvatar from "../../../imgs/DefaultAvatar.webp";
import validateText from "../../../utils/validateText.js";
import { useNavigate } from "react-router-dom";

const Comment = ({ isEnglish, currentUser, CommentId, PostId, AuthorUsername, AuthorAvatar, Content, CreatedDate, Replies = [] }) => {    
    const [showReplyForm, setShowReplyForm] = useState(false);
    const [reply, setReply] = useState("");
    const [showReply, setShowReply] = useState(false);
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const [localReplies, setLocalReplies] = useState(Replies);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!currentUser) { return navigate("/auth/login"); }

        if (validateText(reply)) {
            return toast.error(isEnglish ? "Your reply contains inappropriate words" : "Tu respuesta incluye palabras inapropiadas");
        }

        const replyPromise = postComment({
            post: PostId,
            content: reply,
            parent: CommentId,
        });

        setLoading(true);
        const toastId = toast.loading(isEnglish ? "Posting reply..." : "Enviando respuesta...");

        try {
            const nuevaRespuesta = await replyPromise;
            setLocalReplies(prev => [...prev, nuevaRespuesta]);

            toast.success(isEnglish ? "Reply posted!" : "Respuesta publicada!", { id: toastId });

            setReply("");
            setShowReplyForm(false);
            setShowReply(true);
        } catch (error) {
            toast.error(isEnglish ? "Error posting reply" : "Error al responder", { id: toastId });
            console.error("Error al hacer reply: ", error)
        } finally {
            setLoading(false);
        }
    }

  return (
    <div className="flex flex-col gap-2 w-full">
        <div className="w-full flex gap-4">
            <img
                className="shrink-0 size-10 rounded-full object-cover border border-zinc-800 dark:border-zinc-900/50"
                src={AuthorAvatar}
                alt={AuthorUsername} />

            <div className="flex-1 min-w-0 flex flex-col gap-2">
                <div className="flex items-center gap-4">
                    <Link
                        to={`/blog/profile/${AuthorUsername}`}
                        className="truncate font-bold text-sm hover:text-orange-500 transition-all duration-200 ease-in-out cursor-pointer tracking-wider">
                        @{AuthorUsername}
                    </Link>
                    <span className="shrink-0 text-zinc-950 dark:text-zinc-50 text-xs">
                        {new Date(CreatedDate).toLocaleDateString()}
                    </span>
                </div>

                {/* Texto del comentario */}
                <div className="w-full max-h-32 overflow-y-auto custom-scrollbar">
                    <p className="text-zinc-900 dark:text-zinc-100 text-sm leading-relaxed whitespace-pre-line wrap-break-word">
                        {Content}
                    </p>
                </div>

                {
                    showReplyForm ? (
                        <form onSubmit={handleSubmit} className="flex flex-col gap-2 pt-2">
                            <textarea
                                value={reply}
                                onChange={(e) => setReply(e.target.value)}
                                className="w-full dark:bg-zinc-900/50 border border-zinc-800 rounded-lg p-2 placeholder:text-zinc-600 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-all resize-none text-sm custom-scrollbar shadow-xl"
                                placeholder={isEnglish ? "Add a reply..." : "Añade una respuesta..."}
                                rows={1}/>

                            <div className="flex justify-end gap-4">
                                <button
                                    type="button"
                                    onClick={() => setShowReplyForm(false)}
                                    className="px-4 sm:px-6 py-2 text-zinc-400 hover:text-white rounded-full transition-all font-semibold text-sm uppercase tracking-wide cursor-pointer">
                                    {isEnglish ? "Cancel" : "Cancelar"}
                                </button>
                                <button
                                    type="submit"
                                    disabled={!reply.trim() || loading}
                                    className="px-4 sm:px-6 py-2 bg-orange-600 hover:bg-orange-700 disabled:bg-zinc-700 disabled:text-zinc-500 rounded-full transition-all font-bold text-sm uppercase tracking-wide cursor-pointer disabled:cursor-not-allowed">
                                    {isEnglish ? "Reply" : "Responder"}
                                </button>
                            </div>
                        </form>
                    ) : (
                        <div className="flex justify-end">
                            <button
                                onClick={() => setShowReplyForm(true)}
                                className="w-fit text-xs text-zinc-400 mt-2 hover:text-zinc-500 dark:hover:text-white transition-colors font-semibold uppercase tracking-wider cursor-pointer">
                                <span>{isEnglish ? "Reply" : "Responder"}</span>
                            </button>
                        </div>
                    )
                }
            </div>
        </div>

        {
            localReplies.length > 0 && (
                <div className="flex flex-col gap-6 pl-12 border-l border-zinc-800">
                    <span
                        onClick={() => setShowReply(!showReply)}
                        className="text-zinc-400 text-sm hover:text-zinc-500 dark:hover:text-white cursor-pointer transition-all duration-200 ease-in-out">
                        { isEnglish ? (showReply ? 'Hide replies' : 'Show replies') : (showReply ? 'Ocultar respuestas' : 'Ver respuestas') }
                    </span>

                    {
                        showReply && localReplies.map((r) => {
                            console.log(r)
                            return (
                                <Reply
                                    key={r.id}
                                    AuthorUsername={r.author_name}
                                    AuthorAvatar={r?.author_avatar || DefaultAvatar}
                                    Content={r.content}
                                    CreatedDate={r.created_at}/>
                            )
                        })
                    }
                </div>
            )
        }

    </div>
  );
};

export default React.memo(Comment);