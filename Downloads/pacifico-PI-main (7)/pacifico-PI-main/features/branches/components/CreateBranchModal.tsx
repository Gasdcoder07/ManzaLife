import { ModalLayout } from "@/shared/components/ModalLayout";
import { useState, useRef } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { createBranch, type CreateBranchPayload } from "@/features/branches/services/branch.service";

interface CreateBranchModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const initialForm = {
    company_name: "",
    company_description: "",
    company_address: "",
    company_phone: "",
};

export const CreateBranchModal = ({ isOpen, onClose }: CreateBranchModalProps) => {
    const queryClient = useQueryClient();
    const [formData, setFormData] = useState(initialForm);

    // Estado para la foto (almacena el archivo y la vista previa)
    // OJO: por ahora el backend no recibe imagen, así que solo se muestra la vista previa
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(null);

    // Referencia para activar el input de tipo file de manera oculta
    const fileInputRef = useRef<HTMLInputElement>(null);

    const resetForm = () => {
        setFormData(initialForm);
        setImageFile(null);
        setImagePreview(null);
    };

    const { mutate: mutateCreateBranch, isPending: isCreating } = useMutation({
        mutationFn: (data: CreateBranchPayload) => createBranch(data),

        onSuccess: () => {
            toast.success("Sucursal creada correctamente");
            queryClient.invalidateQueries({ queryKey: ["branches"] });
            resetForm();
            onClose();
        },

        onError: (error: any) => {
            toast.error(error?.response?.data?.error || "Ocurrió un error al crear la sucursal");
        },
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // Manejar el cambio de imagen
    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        if (!["image/jpeg", "image/png"].includes(file.type)) {
            toast.error("Solo se permiten imágenes JPG o PNG.");
            return;
        }

        if (file.size > 2 * 1024 * 1024) {
            toast.error("La imagen no puede pesar más de 2 MB.");
            return;
        }

        setImageFile(file);

        // Generar una vista previa en tiempo real
        const reader = new FileReader();
        reader.onloadend = () => {
            setImagePreview(reader.result as string);
        };
        reader.readAsDataURL(file);
    };

    const triggerFileSelect = () => {
        fileInputRef.current?.click();
    };

    const handleClose = () => {
        if (isCreating) return;
        resetForm();
        onClose();
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!formData.company_name.trim() || !formData.company_address.trim() || !formData.company_phone.trim()) {
            toast.error("Por favor, completa todos los campos obligatorios.");
            return;
        }

        mutateCreateBranch({
            name: formData.company_name.trim(),
            direction: formData.company_address.trim(),
            phone: formData.company_phone.trim(),
            contact_info: formData.company_description.trim(),
        });
    };

    return (
        <ModalLayout isOpen={isOpen} onClose={handleClose} title="Crear nueva sucursal">
            <form onSubmit={handleSubmit} className="flex flex-col gap-3 text-sm">

                {/* Sección para subir/cambiar foto */}
                <div className="flex flex-col items-center gap-2 bg-neutral-50 p-2 rounded-xl border border-dashed border-neutral-200">
                    <span className="font-medium text-neutral-600 self-start">Foto de la sucursal</span>
                    <div
                        onClick={triggerFileSelect}
                        className="relative group w-12 h-12 rounded-full border-2 border-neutral-200 overflow-hidden cursor-pointer hover:border-cyan-400 transition-all duration-200"
                    >
                        {imagePreview ? (
                            <img
                                src={imagePreview}
                                alt="Previsualización"
                                className="w-full h-full object-cover"
                            />
                        ) : (
                            <div className="w-full h-full bg-neutral-100 flex flex-col items-center justify-center text-neutral-400">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 0 1 5.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 0 0-1.134-.175 2.31 2.31 0 0 1-1.64-1.055l-.822-1.316a2.192 2.192 0 0 0-1.736-1.039 48.774 48.774 0 0 0-5.232 0 2.192 2.192 0 0 0-1.736 1.039l-.821 1.316Z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0ZM18.75 10.5h.008v.008h-.008V10.5Z" />
                                </svg>
                            </div>
                        )}

                        {/* Overlay de hover "Cambiar foto" */}
                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center text-white text-xs font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                            Cambiar foto
                        </div>
                    </div>

                    <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleImageChange}
                        accept="image/jpeg,image/png"
                        className="hidden"
                    />

                    <button
                        type="button"
                        onClick={triggerFileSelect}
                        className="text-xs font-medium text-cyan-600 hover:text-cyan-700"
                    >
                        {imagePreview ? "Elegir otra imagen" : "Subir imagen"}
                    </button>
                    <span className="text-[10px] text-neutral-400">Formatos permitidos: JPG, PNG. Máx 2MB.</span>
                </div>

                {/* Campos de texto */}
                <div className="flex flex-col gap-2">
                    <label className="font-medium text-neutral-600">Nombre de la sucursal *</label>
                    <input
                        type="text"
                        name="company_name"
                        value={formData.company_name}
                        onChange={handleInputChange}
                        placeholder="Ej. Sucursal Centro"
                        className="w-full p-3 rounded-lg border border-neutral-200 focus:border-cyan-400 focus:ring-4 focus:ring-cyan-400/5 outline-none transition-colors duration-200 ease-in-out"
                    />
                </div>

                <div className="flex flex-col gap-2">
                    <label className="font-medium text-neutral-600">Descripción</label>
                    <input
                        type="text"
                        name="company_description"
                        value={formData.company_description}
                        onChange={handleInputChange}
                        placeholder="Ej. Sucursal principal de ventas"
                        className="w-full p-3 rounded-lg border border-neutral-200 focus:border-cyan-400 focus:ring-4 focus:ring-cyan-400/5 outline-none transition-colors duration-200 ease-in-out"
                    />
                </div>

                <div className="flex flex-col gap-2">
                    <label className="font-medium text-neutral-600">Dirección *</label>
                    <input
                        type="text"
                        name="company_address"
                        value={formData.company_address}
                        onChange={handleInputChange}
                        placeholder="Ej. Av. Principal 123"
                        className="w-full p-3 rounded-lg border border-neutral-200 focus:border-cyan-400 focus:ring-4 focus:ring-cyan-400/5 outline-none transition-colors duration-200 ease-in-out"
                    />
                </div>

                <div className="flex flex-col gap-2">
                    <label className="font-medium text-neutral-600">Teléfono *</label>
                    <input
                        type="tel"
                        name="company_phone"
                        value={formData.company_phone}
                        onChange={handleInputChange}
                        placeholder="Ej. 555 123 4567"
                        className="w-full p-3 rounded-lg border border-neutral-200 focus:border-cyan-400 focus:ring-4 focus:ring-cyan-400/5 outline-none transition-colors duration-200 ease-in-out"
                    />
                </div>

                <div className="flex justify-end gap-3 mt-4">
                    <button
                        type="button"
                        onClick={handleClose}
                        disabled={isCreating}
                        className="px-4 py-2 rounded-lg border border-neutral-200 text-neutral-600 hover:bg-neutral-50 transition-colors ease-in-out duration-200 cursor-pointer disabled:opacity-50"
                    >
                        Cancelar
                    </button>
                    <button
                        type="submit"
                        disabled={isCreating}
                        className={`px-4 py-2 rounded-lg text-white font-medium transition-colors ease-in-out duration-200 ${
                            isCreating
                                ? "bg-neutral-400 cursor-not-allowed"
                                : "bg-cyan-400 hover:bg-cyan-500 cursor-pointer"
                        }`}
                    >
                        {isCreating ? "Creando sucursal..." : "Crear sucursal"}
                    </button>
                </div>
            </form>
        </ModalLayout>
    );
};
