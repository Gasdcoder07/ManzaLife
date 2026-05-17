import { useState } from "react";
import { TiPin } from "react-icons/ti";
import { MdEdit, MdDelete } from "react-icons/md";
import EditRequestModal from "../../Modals/EditRequestModal";

const RequestItem = ({ isEnglish, id, type, description, status }) => {
    const lang = isEnglish ? 'en' : 'es';

    const statusMap = {
        pending: {
            es: "Pendiente",
            en: "Pending",
        },
        approved: {
            es: "Aprobada",
            en: "Approved",
        },
        rejected: {
            es: "Rechazada",
            en: "Rejected",
        },
    };

    const typeMap = {
        admin_role: {
            es: "Solicitud de administrador",
            en: "Admin role",
        },
        ban_user: {
            es: "Solicitud de baneo",
            en: "Ban user",
        },
        new_category: {
            es: "Nueva categoría",
            en: "New category",
        },
    };

    const [showEditRequestModal, setShowEditRequestModal] = useState(false);
    const [request, setRequest] = useState({
        type: type,
        description: description,
    });

    return (
        <div
            onClick={() => setShowEditRequestModal(true)}
            className="bg-[#fcfcfc] dark:bg-[#0d0d0f] rounded-xl border border-neutral-300 dark:border-neutral-800 p-4 flex flex-col gap-6 w-full">
            <div className="flex flex-col gap-2">
                <div className="flex justify-between items-center gap-4">
                    <div className="flex items-center gap-2">
                        <TiPin/>
                        <span className="italic">{typeMap[request.type]?.[lang]}</span>
                    </div>

                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => setShowEditRequestModal(true)}
                            className="cursor-pointer hover:text-orange-600 transition-colors ease-in-out duration-200">
                            <MdEdit/>
                        </button>

                        <button>
                            <MdDelete/>
                        </button>
                    </div>
                </div>

                <div className="w-full h-36 overflow-y-auto custom-scrollbar">
                    <p className="leading-relaxed whitespace-pre-line wrap-break-word">{request.description}</p>
                </div>
            </div>

            <div className="flex justify-center items-center gap-2">
                <div className="bg-yellow-500 size-4 rounded-full"/>
                <span className="text-yellow-500 text-center">{statusMap[status]?.[lang]}</span>
            </div>

            {
                showEditRequestModal && (
                    <EditRequestModal
                        isEnglish={isEnglish}
                        setRequest={setRequest}
                        setShowModal={setShowEditRequestModal}
                        requestId={id}
                        requestDescription={request.description}
                        requestType={request.type}/>
                )
            }
        </div>
    );
};

export default RequestItem;
