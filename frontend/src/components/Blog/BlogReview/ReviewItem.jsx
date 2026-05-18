import { Link } from "react-router-dom";
import { formatDate } from "../../../../utils/formatDate";
import { FaUser, FaCheck,  } from "react-icons/fa";
import { TiPin } from "react-icons/ti";
import { IoTime, IoClose, IoCheckmarkSharp } from "react-icons/io5";
import { FaMessage } from "react-icons/fa6";
import { updateRequestAsAdmin } from "../../../services/requestService";

const statusMap = {
    pending: {
        es: "Pendiente",
        en: "Pending"
    },
    approved: {
        es: "Aprobada",
        en: "Approved"
    },
    rejected: {
        es: "Rechazada",
        en: "Rejected"
    }
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

const ReviewItem = ({ isEnglish, id, username, type, date, details, status }) => {
    const lang = isEnglish ? 'en' : 'es';

    const handleApprove = async () => {
        const res = await updateRequestAsAdmin(id, { status: "approved" });
        console.log(res);
    };

    const handleReject = async () => {
        const res = await updateRequestAsAdmin(id, { status: "rejected" });
        console.log(res);
    }

    return (
        <div className="bg-[#fcfcfc] dark:bg-[#0d0d0f] rounded-xl border border-neutral-300 dark:border-neutral-800 p-6 flex flex-col gap-6 w-full shadow-xl">
            <div className="flex flex-col gap-2">
                <div>
                    <Link
                        to={`/blog/profile/${username}`}
                        className="flex gap-4 items-center hover:text-orange-600 transition-colors ease-in-out duration-200"
                    >
                        <FaUser className="text-xl" />
                        {username}
                    </Link>
                </div>
                <div className="flex gap-4 items-center">
                    <TiPin className="text-xl" />
                    <span className="truncate">{typeMap[type]?.[lang]}</span>
                </div>
                <div className="flex gap-4 items-center">
                    <IoTime className="text-xl" />
                    <span>{formatDate(date)}</span>
                </div>
            </div>

            <div className="w-full h-12 overflow-y-auto custom-scrollbar">
                <p className="leading-relaxed whitespace-pre-line wrap-break-word">
                    {details}
                </p>
            </div>

            <div className="flex gap-4 items-center">
                <div className="bg-yellow-500 dark:bg-yellow-600 size-4 rounded-full" />
                <span className="text-yellow-500 dark:text-yellow-600">{statusMap[status]?.[lang]}</span>
            </div>

            <div className="text-white w-full flex items-center justify-between gap-4">
                <button
                    onClick={handleApprove}
                    className="flex justify-center items-center bg-green-600 dark:bg-green-700 hover:bg-green-500 dark:hover:bg-green-600 rounded-md px-6 py-3 cursor-pointer">
                    <IoCheckmarkSharp className="text-lg"/>
                </button>

                <button
                    onClick={handleReject}
                    className="flex justify-center items-center bg-red-600 dark:bg-red-700 hover:bg-red-500 dark:hover:bg-red-600 rounded-md px-6 py-3 cursor-pointer">
                    <IoClose className="text-lg"/>
                </button>
            </div>
        </div>
    );
};

export default ReviewItem;
