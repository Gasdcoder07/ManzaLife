import { useState } from "react";
import ModalLayout from "../../layouts/ModalLayout";
import { updateProfile } from "../../services/profileService";
import { makeAdmin, removeAdmin } from "../../services/userService";
import toast from "react-hot-toast";

const AdminUserModal = ({ isAdmin = false, isEnglish = false, setModal, setProfileData, userId, username }) => {
    const [loading, setLoading] = useState(false);

    const handleMakeAdmin = async () => {
        setLoading(true);

        const toastId = toast.loading(
            isEnglish ? "Making user admin..." : "Haciendo admin al usuario...",
        );

        try {
            await makeAdmin(userId);

            setProfileData(prev => ({
                ...prev,
                isAdmin: true,
                user_type: "admin"
            }));

            toast.success(
                isEnglish ? "User is now an admin." : "El usuario ahora es admin.",
                {
                    id: toastId,
                }
            );

            setModal(false);
        } catch (error) {
            toast.error(
                isEnglish ? "Failed to make user admin." : "Error al hacer admin al usuario.",
                {
                    id: toastId,
                }
            );

            console.error("Error making user admin:", error);
        } finally {
            setLoading(false);
        }
    }

    const handleRemoveAdmin = async () => {
        setLoading(true);

        const toastId = toast.loading(
            isEnglish ? "Removing admin privileges..." : "Eliminando privilegios de admin...",
        );

        try {
            await removeAdmin(userId);

            setProfileData(prev => ({
                ...prev,
                isAdmin: false,
                user_type: "reader"
            }));

            toast.success(
                isEnglish
                    ? "User is no longer an admin."
                    : "El usuario ya no es admin.",
                {
                    id: toastId,
                },
            );

            setModal(false);
        } catch (error) {
            toast.error(
                isEnglish
                    ? "Failed to remove admin privileges."
                    : "Error al quitar privilegios de admin.",
                {
                    id: toastId,
                },
            );

            console.error("Error removing admin privileges:", error);
        } finally {
            setLoading(false);
        }
    };

    if (!isAdmin) {
        return (
            <ModalLayout>
                <div
                    className="bg-[#fcfcfc] dark:bg-zinc-950 border border-neutral-700 max-w-sm w-full rounded-xl px-6 py-4 flex flex-col gap-4 text-neutral-500 dark:text-neutral-300">
                    <div className="flex flex-col gap-2 text-center">
                        <h2 className="tracking-wider italic text-2xl text-zinc-950 dark:text-white font-semibold">
                            {isEnglish ? "Administrate User" : "Administrar Usuario"}
                        </h2>

                        <span className="tracking-widest leading-relaxed">
                            {isEnglish ? "Give admin privileges to" : "¿Dar privilegios de admin a"} <strong>@{username}</strong>?
                        </span>
                    </div>

                    <div className="mt-2 flex justify-end items-center gap-4">
                        <button
                            onClick={() => handleMakeAdmin()}
                            disabled={loading}
                            className={`${loading ? 'bg-zinc-700 text-zinc-500 cursor-not-allowed' : 'text-white bg-orange-600 hover:-translate-y-1 cursor-pointer'} transition-all duration-200 ease-in-out px-4 py-2 rounded`}>
                            {isEnglish ? "Make Admin" : "Hacer Admin"}
                        </button>

                        <button
                            onClick={() => setModal(false)}
                            className="text-zinc-950 dark:text-white border border-neutral-700 px-4 py-2 rounded hover:-translate-y-1 transition-all duration-200 ease-in-out cursor-pointer">
                            {isEnglish ? "Cancel" : "Cancelar"}
                        </button>
                    </div>
                </div>
            </ModalLayout>
        )
    }

    return (
        <ModalLayout>
            <div className="bg-[#fcfcfc] dark:bg-zinc-950 border border-neutral-700 max-w-sm w-full rounded-xl px-6 py-4 flex flex-col gap-4 text-neutral-500 dark:text-neutral-300">
                <div className="flex flex-col gap-2 text-center">
                    <h2 className="tracking-wider italic text-2xl text-zinc-950 dark:text-white font-semibold">
                        {isEnglish
                            ? "Administrate User"
                            : "Administrar Usuario"}
                    </h2>

                    <span className="tracking-widest leading-relaxed">
                        {isEnglish
                            ? "Remove admin privileges from"
                            : "¿Quitar privilegios de admin a"}{" "}
                        <strong>@{username}</strong>?
                    </span>
                </div>

                <div className="mt-2 flex justify-end items-center gap-4">
                    <button
                        disabled={loading}
                        onClick={() => handleRemoveAdmin()}
                        className={`${loading ? "bg-zinc-700 text-zinc-500 cursor-not-allowed" : "text-white bg-red-600 hover:-translate-y-1 cursor-pointer"} transition-all duration-200 ease-in-out px-4 py-2 rounded`}
                    >
                        {isEnglish ? "Remove Admin" : "Quitar Admin"}
                    </button>

                    <button
                        onClick={() => setModal(false)}
                        className="text-zinc-950 dark:text-white border border-neutral-700 px-4 py-2 rounded hover:-translate-y-1 transition-all duration-200 ease-in-out cursor-pointer"
                    >
                        {isEnglish ? "Cancel" : "Cancelar"}
                    </button>
                </div>
            </div>
        </ModalLayout>
    );
};

export default AdminUserModal;
