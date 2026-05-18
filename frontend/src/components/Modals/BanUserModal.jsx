import { useState } from "react";
import toast from "react-hot-toast";
import ModalLayout from "../../layouts/ModalLayout";
import { banUser } from "../../services/userService";

import { useLanguage } from "../../context/LanguageContext";

const BanUserModal = ({ username, userId, setShowBanModal }) => {
    const { idioma } = useLanguage();
    const isEnglish = idioma === "en";
    const [loading, setLoading] = useState(false);
    const [reason, setReason] = useState("");

    const handleConfirmBan = async () => {
        if (!reason.trim()) {
            toast.error(isEnglish ? "Please provide a reason for the ban." : "Por favor, proporciona una razón para la prohibición.");
            return;
        }
        
        setLoading(true);
        try {
            await banUser(userId, reason);
            toast.success(isEnglish ? "User banned successfully." : "Usuario baneado con éxito.");
            setShowBanModal(false);
        } catch (error) {
            toast.error(isEnglish ? "Failed to ban user." : "Error al banear al usuario.");
        } finally {
            setLoading(false);
        }
    }
    return (
        <ModalLayout>
            <div className="bg-[#fffbf8] dark:bg-zinc-950 border border-neutral-700 max-w-sm w-full rounded-xl px-6 py-4 flex flex-col gap-4 text-neutral-500 dark:text-neutral-300">
                <div className="flex flex-col gap-4 text-center">
                    <h2 className="tracking-wider italic text-2xl text-zinc-950 dark:text-white font-semibold">
                        {isEnglish ? "Ban User" : "Banear Usuario"}
                    </h2>
                    <span className="tracking-widest leading-relaxed">
                        {isEnglish ? "Ban" : "Banear"} <strong>@{username}</strong>
                    </span>
                </div>

                <hr className="text-black/20 dark:text-white/10" />

                <div className="flex flex-col gap-2">
                    <label className="text-sm font-medium text-zinc-950 dark:text-white">
                        {isEnglish ? "Ban Reason" : "Motivo del Baneo"}
                    </label>
                    <textarea
                        value={reason}
                        onChange={(e) => setReason(e.target.value)}
                        placeholder={isEnglish ? "Enter ban reason..." : "Ingresa el motivo..."}
                        className="bg-neutral-100 dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 rounded px-3 py-2 text-zinc-950 dark:text-white focus:outline-none focus:border-blue-500 resize-none"
                        rows="4"
                    />
                </div>

                <div className="mt-2 flex justify-end items-center gap-4">
                    <button
                        disabled={loading}
                        onClick={handleConfirmBan}
                        className="text-white bg-red-600 hover:-translate-y-1 transition-all duration-200 ease-in-out cursor-pointer px-4 py-2 rounded disabled:opacity-50">
                        {isEnglish ? "Ban" : "Banear"}
                    </button>

                    <button
                        onClick={() => setShowBanModal(false)}
                        className="text-zinc-950 dark:text-white border border-neutral-700 px-4 py-2 rounded hover:-translate-y-1 transition-all duration-200 ease-in-out cursor-pointer">
                        {isEnglish ? "Cancel" : "Cancelar"}
                    </button>
                </div>
            </div>
        </ModalLayout>
    )
}

export default BanUserModal;