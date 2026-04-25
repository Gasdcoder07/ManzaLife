import { useState } from "react";
import ModalLayout from "../../layouts/ModalLayout";
import toast from "react-hot-toast";

const DeletePostModal = ({ postSlug, setShowDeleteModal, deleteConfirm }) => {
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
                <h2 className='tracking-wider italic text-2xl text-zinc-950 dark:text-white font-semibold'>Borrar publicación</h2>

                <span className="tracking-widest leading-relaxed">Esta publicación será <strong className="text-red-600">eliminada</strong> permanentemente.</span>
            </div>
            
            <hr className='text-black/20 dark:text-white/10'/>

            <div className='mt-2 flex justify-end items-center gap-4'>
                <button
                    disabled={loading}
                    onClick={handleConfirmDelete}
                    className={`text-white bg-red-600 hover:-translate-y-1 transition-all duration-200 ease-in-out cursor-pointer px-4 py-2 rounded`}>
                    Eliminar
                </button>

                <button
                    onClick={() => setShowDeleteModal(false)}
                    className='text-zinc-950 dark:text-white border border-neutral-700 px-4 py-2 rounded hover:-translate-y-1 transition-all duration-200 ease-in-out cursor-pointer'>
                    Cancelar
                </button>

            </div>
        </div>
    </ModalLayout>
  );
};

export default DeletePostModal;
