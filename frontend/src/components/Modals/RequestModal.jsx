import { useState } from "react";
import { useLanguage } from "../../context/LanguageContext";
import ModalLayout from "../../layouts/ModalLayout";
import toast from "react-hot-toast";
import { postRequest } from "../../services/requestService";
import { MdArrowDropDown } from "react-icons/md";

const RequestModal = ({ setShowModal, setRequests }) => {
    const { idioma } = useLanguage();
    const isEnglish = idioma === "en";

    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        request_type: '',
        details: ''
    });

    const [requestTypeVisual, setRequestTypeVisual] = useState(isEnglish ? 'Request Type' : 'Tipo de solicitud');
    const [showDropdown, setShowDropdown] = useState(false);

    const RequestTypes = [
        {
            value: "admin_role",
            visual: isEnglish ? "Admin role" : "Rol de administrador",
        },
        {
            value: "new_category",
            visual: isEnglish ? "New category" : "Nueva categoría",
        },
        {
            value: "ban_user",
            visual: isEnglish ? "Ban user" : "Banear usuario",
        },
    ];

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name] : value }));
    }

    const handleClick = async () => {
        const requestExits = RequestTypes.some(
            (request) => request.value === formData.request_type
        );

        if (!requestExits) {
            return toast.error(
                isEnglish
                ? 'Select a valid request type.'
                : 'Selecciona un tipo de solicitud válido.'
            );
        };

        if (!formData.details.trim()) {
            return toast.error(
                isEnglish
                    ? "Details cannot be empty."
                    : "Los detalles no pueden estar vacios.",
            );
        };

        setLoading(true);

        const toastId = toast.loading(
            isEnglish
                ? 'Sending request...'
                : 'Enviando solicitud...'
        )

        try {
            const response = await postRequest(formData);

            toast.success(
                isEnglish
                    ? 'Request submitted successfully.'
                    : 'Solicitud enviada correctamente.',
                {
                    id: toastId,
                }
            );

            setShowModal(false);
        }
        catch (e) {
            toast.error(
                isEnglish
                    ? 'Failed to send request.'
                    : 'Fallo al enviar la solicitud.',
                {
                    id: toastId,
                }
            );

            console.error("Error al crear solicitud: ", e);
        }
        finally {
            setLoading(false);
        }
    }

  return (
    <ModalLayout>
        <div className="bg-[#fffbf8] dark:bg-zinc-950 border border-neutral-700 max-w-sm w-full rounded-xl px-6 py-4 flex flex-col gap-4 text-neutral-300">
            <div className="space-y-2">
                <h2 className='text-center tracking-wider italic text-zinc-950 dark:text-white'>{isEnglish ? 'New request' : 'Solicitud nueva'}</h2>
                <hr className='text-black/40 dark:text-white/10'/>
            </div>

            <div className="flex flex-col gap-4 text-zinc-950 dark:text-white">
                {/* Dropdown */}
                <div className="relative w-full flex justify-end">
                    <button onClick={() => setShowDropdown(!showDropdown)} className="flex items-center justify-center gap-2 px-3 py-2 border border-black/40 dark:border-white/10 shadow-md rounded-sm">
                        <span>{requestTypeVisual}</span>
                        <MdArrowDropDown className={`text-xl ${showDropdown && 'rotate-180'}`}/>
                    </button>

                    {
                        showDropdown && (
                            <div className="bg-[#fffbf8] absolute top-full z-10 right-0 mt-2 w-48 max-h-24 overflow-y-auto border border-black/40 dark:border-white/10 shadow-md rounded-sm custom-scrollbar">
                                <ul className="flex flex-col px-4 py-2 gap-2">
                                    {
                                        RequestTypes.map((request, index) => {
                                            return (
                                                <li key={request.value}
                                                    onClick={() => {
                                                        setFormData(prev => ({
                                                            ...prev,
                                                            request_type: request.value
                                                        }));
                                                        setRequestTypeVisual(request.visual)
                                                        setShowDropdown(false);
                                                    }}
                                                    className="block hover:bg-black/5 dark:hover:bg-white/5 px-2 py-1 cursor-pointer">
                                                    <span className="text-sm">{request.visual}</span>
                                                </li>
                                            )
                                        })
                                    }
                                </ul>
                            </div>
                        )
                    }

                </div>

                <textarea
                    placeholder={isEnglish ? 'Details' : 'Detalles'}
                    name='details'
                    onChange={handleChange}
                    className='custom-scrollbar resize-none px-3 py-2 rounded-sm border border-black/40 focus:border-black/80 dark:border-white/10 outline-none dark:focus:border-white/20 shadow-md'
                    rows={3}
                    value={formData.details}/>
            </div>

            <div className='mt-2 flex justify-end items-center gap-4'>
                <button
                    onClick={() => setShowModal(false)}
                    className='text-zinc-950 dark:text-white border border-neutral-700 px-4 py-2 rounded hover:-translate-y-1 transition-all duration-200 ease-in-out cursor-pointer'>
                    {isEnglish ? "Cancel" : "Cancelar"}
                </button>

                <button
                    disabled={loading}
                    onClick={handleClick}
                    className={`${loading ? 'bg-zinc-700 text-zinc-500 cursor-not-allowed' : 'text-white bg-orange-600 hover:-translate-y-1 cursor-pointer'} transition-all duration-200 ease-in-out px-4 py-2 rounded`}>
                    {isEnglish ? "Send" : "Enviar"}
                </button>
            </div>
        </div>
    </ModalLayout>
  );
};

export default RequestModal;
