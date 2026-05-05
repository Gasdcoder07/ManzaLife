import { MdError, MdCheckCircle } from "react-icons/md";
import { FaCircleNotch } from "react-icons/fa";

export const toastContainerStyle = {
    top: 80,
    right: 40,
};

const ToastDefaultStyles = "!bg-[#fffbf8] dark:!bg-[#0d0d0f] !border !border-neutral-800/20 dark:!border-neutral-800 !rounded-xl !shadow-lg !font-medium !tracking-wide";

export const toastOptionsConfig = {
    className: ToastDefaultStyles,
    duration: 4000,

    success : {
        className: `${ToastDefaultStyles} !text-green-600`,
        icon: <MdCheckCircle className="text-2xl text-green-600"/>
    },

    error: {
        className: `${ToastDefaultStyles} !text-red-600`,
        icon: <MdError className="text-2xl text-red-600"/>
    },

    loading: {
        className: `${ToastDefaultStyles} !text-orange-600`,
        icon: <FaCircleNotch className="text-2xl text-orange-600 animate-spin transition-all duration-200 ease-in-out"/>
    }
}