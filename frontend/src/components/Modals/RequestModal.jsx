import { useLanguage } from "../../context/LanguageContext";
import ModalLayout from "../../layouts/ModalLayout";

const RequestModal = ({ setShowModal }) => {
    const { idioma } = useLanguage();
    const isEnglish = idioma === "en";

  return (
    <ModalLayout>
        <div className="bg-[#fffbf8] dark:bg-zinc-950 border border-neutral-700 max-w-sm w-full rounded-xl px-6 py-4 flex flex-col gap-4 text-neutral-300">
            <div className="space-y-2">
                <h2 className='text-center tracking-wider italic text-zinc-950 dark:text-white'>{isEnglish ? 'New request' : 'Solicitud nueva'}</h2>
                <hr className='text-black/40 dark:text-white/10'/>
            </div>

            <div className='mt-2 flex justify-end items-center gap-4'>
                <button
                    onClick={() => setShowModal(false)}
                    className='text-zinc-950 dark:text-white border border-neutral-700 px-4 py-2 rounded hover:-translate-y-1 transition-all duration-200 ease-in-out cursor-pointer'>
                    {isEnglish ? "Cancel" : "Cancelar"}
                </button>

                <button
                    className={`text-white bg-orange-600 hover:-translate-y-1 transition-all duration-200 ease-in-out cursor-pointer px-4 py-2 rounded`}>
                    {isEnglish ? "Send" : "Enviar"}
                </button>
            </div>
        </div>
    </ModalLayout>
  );
};

export default RequestModal;
