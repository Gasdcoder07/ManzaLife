import { useState } from "react";
import { useLanguage } from "../../context/LanguageContext";
import ModalLayout from "../../layouts/ModalLayout";

const RequestModal = ({ setShowModal, setRequests }) => {
    const { idioma } = useLanguage();
    const isEnglish = idioma === "en";

    const [requestData, setRequestData] = useState({
        request_type: "",
        title: "",
        description: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setRequestData((prev) => ({ ...prev, [name] : value }))
    }

  return (
    <ModalLayout>
        <div className="bg-[#fffbf8] dark:bg-zinc-950 border border-neutral-700 max-w-sm w-full rounded-xl px-6 py-4 flex flex-col gap-4 text-neutral-300">
            <div className="space-y-2">
                <h2 className='text-center tracking-wider italic text-zinc-950 dark:text-white'>{isEnglish ? 'New request' : 'Solicitud nueva'}</h2>
                <hr className='text-black/40 dark:text-white/10'/>
            </div>

            <div className="flex flex-col gap-2 text-zinc-950 dark:text-white">
                <input
                    placeholder="Request type"
                    name='request_type'
                    onChange={handleChange}
                    className='px-3 py-2 rounded-sm border border-black/40 focus:border-black/80 dark:border-white/10 outline-none dark:focus:border-white/20 shadow-md'
                    value={requestData.request_type}
                    type="text"/>
                
                <input
                    placeholder="Title"
                    name='title'
                    onChange={handleChange}
                    className='px-3 py-2 rounded-sm border border-black/40 focus:border-black/80 dark:border-white/10 outline-none dark:focus:border-white/20 shadow-md'
                    value={requestData.title}
                    type="text"/>

                <textarea
                    placeholder="Description"
                    name='description'
                    onChange={handleChange}
                    className='custom-scrollbar resize-none px-3 py-2 rounded-sm border border-black/40 focus:border-black/80 dark:border-white/10 outline-none dark:focus:border-white/20 shadow-md'
                    rows={3}
                    value={requestData.description}/>
            </div>

            <div className='mt-2 flex justify-end items-center gap-4'>
                <button
                    onClick={() => setShowModal(false)}
                    className='text-zinc-950 dark:text-white border border-neutral-700 px-4 py-2 rounded hover:-translate-y-1 transition-all duration-200 ease-in-out cursor-pointer'>
                    {isEnglish ? "Cancel" : "Cancelar"}
                </button>

                <button
                    onClick={() => {
                        setRequests((prev) => [
                            ...prev,
                            requestData
                        ]);
                        setShowModal(false);
                    }}
                    className={`text-white bg-orange-600 hover:-translate-y-1 transition-all duration-200 ease-in-out cursor-pointer px-4 py-2 rounded`}>
                    {isEnglish ? "Send" : "Enviar"}
                </button>
            </div>
        </div>
    </ModalLayout>
  );
};

export default RequestModal;
