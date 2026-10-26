import { SlideOverPanelLayout } from "@/shared/components/SlideOverPanelLayout";
import { User } from "../types/user";
import { useEffect, useState } from "react";
import { CustomSelect } from "@/shared/components/CustomSelect";

interface EditUserPanelProps {
    user: User;
    isOpen: boolean;
    onClose: () => void;
}

const EditUserPanel = ({ isOpen, onClose, user } : EditUserPanelProps) => {
    const scrollbarStyles = "[&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-neutral-200 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb:hover]:bg-neutral-300";

    const [formData, setFormData] = useState({
        name: user.name ?? "",
        last_name: user.last_name ?? "",
        email: user.email ?? "",
        password: "",
        rol_id: String(user.rol_id)
    });

    useEffect(() => {
        setFormData({
            name: user.name ?? "",
            last_name: user.last_name ?? "",
            email: user.email ?? "",
            password: "",
            rol_id: String(user.rol_id)
        });
    }, [user]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
    }

    return (
        <SlideOverPanelLayout isOpen={isOpen} onClose={onClose} title="Editar usuario">
            <form onClick={handleSubmit} className="flex-1 flex flex-col justify-between min-h-0 h-full">
                <div className={`flex-1 flex flex-col min-h-0 h-full p-6 gap-4 overflow-y-auto ${scrollbarStyles}`}>
                    <span className="text-[10px] text-neutral-400 uppercase font-medium">Datos generales</span>

                    <div className="flex gap-4 items-center">
                        <div className="flex flex-col gap-2">
                            <label className="font-medium text-neutral-600">Nombre</label>
                            <input
                                onChange={handleChange}
                                value={formData.name}
                                type="text"
                                name="name"
                                className="w-full p-3 rounded-lg border border-neutral-200 focus:border-cyan-400 focus:ring-4 focus:ring-cyan-400/5 outline-none transition-colors duration-200 ease-in-out"
                            />
                        </div>
                        <div className="flex flex-col gap-2">
                            <label className="font-medium text-neutral-600">Apellido</label>
                            <input 
                                onChange={handleChange}
                                value={formData.last_name}
                                type="text"
                                name="last_name"
                                className="w-full p-3 rounded-lg border border-neutral-200 focus:border-cyan-400 focus:ring-4 focus:ring-cyan-400/5 outline-none transition-colors duration-200 ease-in-out"
                            />
                        </div>
                    </div>

                    <span className="mt-2 text-[10px] text-neutral-400 uppercase font-medium">Credenciales</span>

                    <div className="flex flex-col gap-2">
                        <label className="font-medium text-neutral-600">Correo electrónico</label>
                        <input
                            onChange={handleChange}
                            value={formData.email}
                            type="email"
                            name="email"
                            className="w-full p-3 rounded-lg border border-neutral-200 focus:border-cyan-400 focus:ring-4 focus:ring-cyan-400/5 outline-none transition-colors duration-200 ease-in-out"
                        />
                    </div>
                    <div className="flex flex-col gap-2">
                        <label className="font-medium text-neutral-600">Nueva contraseña</label>
                        <input
                            onChange={handleChange}
                            value={formData.password}
                            type="password"
                            name="username"
                            className="w-full p-3 rounded-lg border border-neutral-200 focus:border-cyan-400 focus:ring-4 focus:ring-cyan-400/5 outline-none transition-colors duration-200 ease-in-out"
                        />
                        <span className="text-xs text-neutral-500">Deja vacío para conservarla.</span>
                    </div>

                    <CustomSelect
                        label="Rol *"
                        placeholder="Selecciona un rol"
                        options={[
                            { value: "1", label: "Admin" },
                            { value: "2", label: "Gerente" },
                            { value: "3", label: "Cajero" }
                        ]}
                        value={formData.rol_id}
                        onChange={(value) => setFormData({ ...formData, rol_id: value })}
                    />
                </div>

                <div className="border-t border-neutral-200 flex justify-end items-center gap-4 p-6">
                    <button
                        type="button"
                        onClick={onClose}
                        className="px-4 py-2 rounded-lg border border-neutral-200 text-neutral-600 hover:bg-neutral-50 transition-colors ease-in-out duration-200 cursor-pointer"
                    >
                        Cancelar
                    </button>
                    <button
                        type="submit"
                        className="px-4 py-2 rounded-lg bg-cyan-400 text-white font-medium hover:bg-cyan-500 transition-colors ease-in-out duration-200 cursor-pointer"
                    >
                        Guardar cambios
                    </button>
                </div>
            </form>
        </SlideOverPanelLayout>
    )
};

export default EditUserPanel;
