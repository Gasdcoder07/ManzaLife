import toast from "react-hot-toast";
import ModalLayout from "../../layouts/ModalLayout";
import { useState } from "react";
import { deleteRequest } from "../../services/requestService";

const DeleteRequestModal = ({ isEnglish, setShowModal, requestId, setRequests }) => {
    const [loading, setLoading] = useState(false);

    const handleDelete = async (requestId) => {
        setLoading(true);

        const toastId = toast.loading(isEnglish ? "Deleting request..." : "Eliminando solicitud...");

        try {
            const res = await deleteRequest(requestId);

            setRequests(prev =>
                prev.filter(request => request.id !== requestId)
            );

            setShowModal(false);
            toast.success(isEnglish ? "Request deleted successfully!" : "Solicitud eliminada con éxito!", { id: toastId });
        } catch (error) {
            console.error("Error deleting request:", error);
            toast.error(isEnglish ? "Error deleting request." : "Error eliminando solicitud.", { id: toastId });
        } finally {
            setLoading(false);
        }

        setShowModal(false);
    }

    return (
        <ModalLayout>
            <div className="bg-[#fcfcfc] dark:bg-zinc-950 border border-neutral-700 max-w-sm w-full rounded-xl px-6 py-4 flex flex-col gap-4 text-neutral-500 dark:text-neutral-300">
                <div className="flex flex-col gap-4 text-center">
                    <h2 className='tracking-wider italic text-2xl text-zinc-950 dark:text-white font-semibold'>
                        {isEnglish ? "Delete Request" : "Borrar solicitud"}
                    </h2>

                    <span className="tracking-widest leading-relaxed">
                        {isEnglish ? "The request will be" : "La solicitud será"} <strong className="text-red-600">{isEnglish ? "deleted" : "eliminada"}</strong> {isEnglish ? "permanently." : "permanentemente."}
                    </span>
                </div>
                
                <hr className='text-black/20 dark:text-white/10'/>

                <div className='mt-2 flex justify-end items-center gap-4'>
                    <button
                        onClick={() => handleDelete(requestId)}
                        disabled={loading}
                        className={`${loading ? "bg-zinc-700 text-zinc-500 cursor-not-allowed" : 'hover:-translate-y-1 cursor-pointer'} text-white bg-red-600 transition-all duration-200 ease-in-out px-4 py-2 rounded`}>
                        {isEnglish ? "Delete" : "Eliminar"}
                    </button>

                    <button
                        onClick={() => setShowModal(false)}
                        className='text-zinc-950 dark:text-white border border-neutral-700 px-4 py-2 rounded hover:-translate-y-1 transition-all duration-200 ease-in-out cursor-pointer'>
                        {isEnglish ? "Cancel" : "Cancelar"}
                    </button>

                </div>
            </div>
        </ModalLayout>
    );
};

export default DeleteRequestModal;
