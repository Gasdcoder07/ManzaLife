"use client";

import { useRef, useState } from "react";
import { ImagePlus, Save, Trash2, Upload } from "lucide-react";
import toast from "react-hot-toast";

const MAX_SIZE = 2 * 1024 * 1024; // 2 MB
const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp"];

const inputClass =
    "w-full p-3 text-sm border border-neutral-200 rounded-xl hover:border-neutral-300 focus:border-cyan-400 focus:ring-4 focus:ring-cyan-400/10 outline-none transition-colors duration-200 ease-in-out";

const CompanyForm = () => {
    const fileInputRef = useRef<HTMLInputElement>(null);

    const [formData, setFormData] = useState({
        name: "",
        address: "",
        description: "",
    });
    const [logoFile, setLogoFile] = useState<File | null>(null);
    const [logoPreview, setLogoPreview] = useState<string | null>(null);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        if (!ALLOWED_TYPES.includes(file.type)) {
            toast.error("Solo se permiten imágenes JPG, PNG o WebP.");
            return;
        }

        if (file.size > MAX_SIZE) {
            toast.error("El logo no puede pesar más de 2 MB.");
            return;
        }

        if (logoPreview) URL.revokeObjectURL(logoPreview);
        setLogoFile(file);
        setLogoPreview(URL.createObjectURL(file));
    };

    const handleRemoveLogo = () => {
        if (logoPreview) URL.revokeObjectURL(logoPreview);
        setLogoFile(null);
        setLogoPreview(null);
        if (fileInputRef.current) fileInputRef.current.value = "";
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // Aquí después se conecta con el backend (useMutation)
        console.log("Datos:", formData, "Logo:", logoFile);
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="w-full bg-white border border-neutral-200 rounded-lg shadow-sm py-6 px-8 flex flex-col gap-6 max-w-4xl"
        >
            {/* Encabezado de la tarjeta */}
            <div className="flex flex-col gap-2 pb-6 border-b border-neutral-200">
                <h2 className="text-xl font-semibold">Identidad de tu empresa</h2>
                <p className="text-neutral-500 text-sm">
                    Configura el nombre, logo y datos de ubicación de tu empresa para personalizar tu documentación.
                </p>
            </div>

            <div className="flex">
                {/* Columna izquierda: logo */}
                <div className="flex flex-col gap-4 border-r border-neutral-200 pr-8">
                    <div className="flex flex-col gap-2">
                        <label className="font-medium">Logo de la empresa</label>
                        <p className="text-xs text-neutral-500">
                            Sube el logo de tu empresa. Se mostrará en tus comprobantes.
                        </p>
                    </div>

                    <div className="relative h-40 w-full rounded-xl border border-neutral-200 bg-white flex items-center justify-center overflow-hidden">
                        {logoPreview ? (
                            <>
                                <img
                                    src={logoPreview}
                                    alt="Logo de la empresa"
                                    className="w-full h-full object-contain p-2"
                                />

                                <button
                                    type="button"
                                    onClick={handleRemoveLogo}
                                    className="absolute top-2 right-2 flex size-9 items-center justify-center rounded-full border border-red-50 bg-white text-red-500 shadow-sm transition-all duration-200 ease-in-out hover:bg-red-500 hover:text-white cursor-pointer"
                                >
                                    <Trash2 size={16} />
                                </button>
                            </>
                        ) : (
                            <div className="flex flex-col items-center gap-2 px-4 text-center">
                                <div className="flex size-12 items-center justify-center rounded-xl bg-brand-50 text-brand-500">
                                    <ImagePlus size={24} strokeWidth={1.6} />
                                </div>

                                <div className="flex flex-col gap-1">
                                    <span className="text-sm font-medium">
                                        Sin logo
                                    </span>

                                    <p className="text-xs text-neutral-400">
                                        Sube una imagen para identificar tu empresa
                                    </p>
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="flex flex-col gap-2">
                        <span className="text-sm font-medium truncate">
                            {logoFile ? logoFile.name : "Ningún archivo seleccionado"}
                        </span>
                        <div className="flex gap-2">
                            <span className="text-xs text-neutral-500">JPG, PNG o WebP · Máximo 2 MB</span>
                            <span className="text-xs text-neutral-500">Hasta 4096 × 4096 px.</span>
                        </div>
                    </div>

                    <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/jpeg,image/png,image/webp"
                        onChange={handleLogoChange}
                        className="hidden"
                    />

                    <div className="flex justify-end">
                        <button
                            type="button"
                            onClick={() => fileInputRef.current?.click()}
                            className="flex items-center gap-2 px-4 py-2 text-sm font-medium border border-neutral-300 rounded-lg hover:bg-neutral-50 transition-colors cursor-pointer"
                        >
                            <Upload size={16} />
                            Subir logo
                        </button>
                    </div>
                </div>

                {/* Columna derecha: nombre y domicilio */}
                <div className="flex flex-col gap-6 pl-8">
                    <div className="flex flex-col gap-4">
                        <div className="flex flex-col gap-2">
                            <label htmlFor="name" className="font-medium">
                                Nombre de la empresa
                            </label>
                            <p className="text-xs text-neutral-500">
                                Este nombre aparecerá en tus comprobantes y documentos.
                            </p>
                        </div>
                        <input
                            id="name"
                            name="name"
                            type="text"
                            placeholder="Ej. Mi Empresa S.A de C.V."
                            value={formData.name}
                            onChange={handleChange}
                            suppressHydrationWarning
                            className={inputClass}
                        />
                    </div>

                    <div className="flex flex-col gap-4">
                        <div className="flex flex-col gap-2">
                            <label htmlFor="address" className="font-medium">
                                Domicilio de la empresa
                            </label>
                            <p className="text-xs text-neutral-400">
                                Ingresa el domicilio fiscal o la ubicación principal de tu empresa.
                            </p>
                        </div>
                        <textarea
                            id="address"
                            name="address"
                            placeholder="Ej. Calle, número, colonia, ciudad, estado, código postal."
                            rows={4}
                            value={formData.address}
                            onChange={handleChange}
                            suppressHydrationWarning
                            className={`${inputClass} resize-none`}
                        />
                    </div>
                </div>
            </div>

            {/* Descripción a todo el ancho */}
            <div className="flex flex-col gap-4 border-t border-neutral-200 pt-4">
                <div className="flex flex-col gap-2">
                    <label htmlFor="description" className="font-medium">
                        Descripción de la empresa
                    </label>
                    <p className="text-xs text-neutral-500">
                        Agrega una breve descripción de tu empresa. Esta información puede aparecer en tus comprobantes y documentos.
                    </p>
                </div>
                <textarea
                    id="description"
                    name="description"
                    rows={3}
                    maxLength={250}
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Ej. Nos dedicamos a la venta de productos y servicios tecnológicos..."
                    suppressHydrationWarning
                    className={`${inputClass} resize-none`}
                />
            </div>

            {/* Pie con el botón */}
            <div className="flex justify-end pt-6 border-t border-neutral-200">
                <button
                    type="submit"
                    suppressHydrationWarning
                    className="flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white bg-cyan-500 hover:bg-cyan-600 rounded-lg transition-colors duration-200 cursor-pointer"
                >
                    <Save size={16} />
                    Guardar cambios
                </button>
            </div>
        </form>
    );
};

export default CompanyForm;