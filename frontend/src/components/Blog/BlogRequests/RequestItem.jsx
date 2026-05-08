import { TiPin } from "react-icons/ti";

const RequestItem = ({ isEnglish, type, description, status }) => {
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

    return (
        <div className="cursor-pointer group bg-[#fffbf8] dark:bg-[#0d0d0f] rounded-xl border border-neutral-300 dark:border-neutral-800 p-4 flex flex-col gap-6 w-full hover:border-neutral-400 dark:hover:border-neutral-700">
            <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2 group-hover:text-orange-600 transition-colors duration-200 ease-in-out">
                    <TiPin/>
                    <span className="italic">{typeMap[type]?.[lang]}</span>
                </div>

                <div className="w-full h-36 overflow-y-auto custom-scrollbar">
                    <p className="leading-relaxed whitespace-pre-line wrap-break-word">{description}</p>
                </div>
            </div>

            <div className="flex justify-center items-center gap-2">
                <div className="bg-yellow-500 size-4 rounded-full"/>
                <span className="text-yellow-500 text-center">{statusMap[status]?.[lang]}</span>
            </div>
        </div>
    );
};

export default RequestItem;
