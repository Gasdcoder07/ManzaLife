import { useRef, useState } from "react";
import toast from "react-hot-toast";
import { useAuth } from "../../context/AuthContext";
import { useLanguage } from "../../context/LanguageContext";
import { updateProfile } from "../../services/profileService";
import ModalLayout from "../../layouts/ModalLayout";
import { TbPhotoEdit } from "react-icons/tb";
import DefaultBanner from "../../../imgs/LoginResources/Login_bg.png"

const BannerProfileModal = ({ setShowBannerModal, isEnglish }) => {
    const { user, setUser } = useAuth();

    const [loading, setLoading] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);

    const fileInputRef = useRef(null);
    
    const handleUpdate = async () => {
        if (!selectedImage) {
            toast.error(isEnglish ? "Please select an image first." : "Por favor selecciona una imagen primero.");
            return;
        }

        setLoading(true);

        const formData = new FormData();
        formData.append("banner", selectedImage);

        const toastId = toast.loading(isEnglish ? "Updating banner..." : "Actualizando banner...");

        try {
            const updated = await updateProfile(formData);

            setUser(prev => ({
                ...prev,
                ...updated
            }));

            toast.success(isEnglish ? "Banner updated!" : "¡Banner actualizado!", { id: toastId });
            
            setShowBannerModal(false);
        } catch (e) {
            console.error(e);
            toast.error(isEnglish ? "Failed to update banner." : "Error al actualizar el banner.", { id: toastId });
        } finally {
            setLoading(false);
        }
    }

  return (
    <ModalLayout>
        <div className="bg-[#fcfcfc] dark:bg-zinc-950 border border-neutral-700 rounded-xl px-6 py-4 flex flex-col gap-4 text-zinc-950 dark:text-neutral-300">
            <div className="space-y-2">
                <h2 className="text-center tracking-wider italic">
                    {isEnglish ? "Banner Image" : "Imagen de fondo"}
                </h2>
                <hr className="text-black/20 dark:text-white/10"/>
            </div>

            <div className="flex justify-center">
                <div className="relative">
                    <input
                        type="file"
                        ref={fileInputRef}
                        className="hidden"
                        accept="image/*"
                        onChange={(e) => setSelectedImage(e.target.files[0])}/>

                    <img
                        className="border-2 border-zinc-950 object-cover rounded-full size-56"
                        src={selectedImage ? URL.createObjectURL(selectedImage) : user?.banner ? user.banner : DefaultBanner}
                        alt={`Banner de ${user.username}`}/>
                    
                    <button
                        onClick={() => fileInputRef.current.click()}
                        className="absolute bottom-0 right-0 -translate-x-full bg-black/10 hover:bg-black/20 dark:bg-white/10 p-2 rounded-full cursor-pointer dark:hover:bg-white/20 transition-colors duration-200 ease-in-out">
                        <TbPhotoEdit/>
                    </button>
                </div>
            </div>

            <div className="mt-2 flex justify-end items-center gap-4">
                <button
                    onClick={() => setShowBannerModal(false)}
                    className="text-zinc-950 dark:text-white border border-neutral-700 px-4 py-2 rounded hover:-translate-y-1 transition-all duration-200 ease-in-out cursor-pointer">
                    {isEnglish ? "Cancel" : "Cancelar"}
                </button>

                <button
                    onClick={handleUpdate}
                    className={`${loading ? 'bg-zinc-700 text-zinc-500' : 'text-white bg-orange-600 hover:-translate-y-1 transition-all duration-200 ease-in-out cursor-pointer'} px-4 py-2 rounded`}>
                    {isEnglish ? "Update" : "Actualizar"}
                </button>
            </div>
        </div>
    </ModalLayout>
  );
};

export default BannerProfileModal;
