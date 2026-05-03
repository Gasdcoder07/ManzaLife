import { useState } from "react";
import toast from "react-hot-toast";
import { useLanguage } from "../../context/LanguageContext";
import ModalLayout from "../../layouts/ModalLayout";

const DeletePostModal = ({ postName, postSlug, setShowDeleteModal, deleteConfirm }) => {
    const { idioma } = useLanguage();
    const isEnglish = idioma === "en";

    const [loading, setLoading] = useState(false);

    const handleConfirmDelete = async () => {
        setLoading(true);

        try {
            const res = await deleteConfirm(postSlug);
            toast.success("Publicación eliminada con éxito.")
        } catch (e) {
            console.error("Error al eliminar la publicación: ", e);
        } finally {
            setLoading(false);
            setShowDeleteModal(false);
        }
    }

  return (
    <ModalLayout>
        <div className="bg-[#fffbf8] dark:bg-zinc-950 border border-neutral-700 max-w-sm w-full rounded-xl px-6 py-4 flex flex-col gap-4 text-neutral-500 dark:text-neutral-300">
            <div className="flex flex-col gap-4 text-center">
                <h2 className='tracking-wider italic text-2xl text-zinc-950 dark:text-white font-semibold'>
                    {isEnglish ? "Delete Post" : "Borrar publicación"}
                </h2>

                <span className="tracking-widest leading-relaxed">
                    {isEnglish ? "The post" : "La publicación"} "{postName}" {isEnglish ? "will be" : "será"} <strong className="text-red-600">{isEnglish ? "deleted" : "eliminada"}</strong> {isEnglish ? "permanently." : "permanentemente."}
                </span>
            </div>
            
            <hr className='text-black/20 dark:text-white/10'/>

            <div className='mt-2 flex justify-end items-center gap-4'>
                <button
                    disabled={loading}
                    onClick={handleConfirmDelete}
                    className={`text-white bg-red-600 hover:-translate-y-1 transition-all duration-200 ease-in-out cursor-pointer px-4 py-2 rounded`}>
                    {isEnglish ? "Delete" : "Eliminar"}
                </button>

                <button
                    onClick={() => setShowDeleteModal(false)}
                    className='text-zinc-950 dark:text-white border border-neutral-700 px-4 py-2 rounded hover:-translate-y-1 transition-all duration-200 ease-in-out cursor-pointer'>
                    {isEnglish ? "Cancel" : "Cancelar"}
                </button>

            </div>
        </div>
    </ModalLayout>
  );
};

export default DeletePostModal;
