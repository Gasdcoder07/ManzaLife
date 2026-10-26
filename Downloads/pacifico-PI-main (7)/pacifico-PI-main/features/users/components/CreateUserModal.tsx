import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import toast from "react-hot-toast";

import { CustomSelect } from "@/shared/components/CustomSelect";
import { ModalLayout } from "@/shared/components/ModalLayout";

import { createManager, createCashier } from "../services/users.service";
import { CreateUserRequest } from "../types/user";

interface CreateUserModalProps {
    isOpen: boolean;
    onClose: () => void;
    branch_id: string | number | null | undefined;
    company_id: string | number | null | undefined;
}

export const CreateUserModal = ({ isOpen, onClose, branch_id, company_id }: CreateUserModalProps) => {
    const [formData, setFormData] = useState({
        name: "",
        last_name: "",
        email: "",
        password: "",
        rol_id: "",
        branch_id: Number(branch_id),
        company_id: company_id
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const queryClient = useQueryClient();

    const { mutate, isPending } = useMutation({
        mutationFn: (data: CreateUserRequest) => {
            if (String(data.rol_id) === "2") {
                return createManager(data);
            }

            if (String(data.rol_id) === "3") {
                return createCashier(data);
            }

            throw new Error("Selecciona un rol válido");
        },

        onSuccess: async () => {
            toast.success("Usuario creado exitosamente")

            await queryClient.invalidateQueries({
                queryKey: ["getBranch", Number(branch_id)],
            });

            setFormData({
            name: "",
            last_name: "",
            email: "",
            password: "",
            rol_id: "",
            branch_id: Number(branch_id) ?? "",
            company_id: company_id ?? "",
            });

            onClose();
        },
        
        onError: (error: any) => {
            toast.error(error)
            console.error("Error al crear usuario:", error.response?.data ?? error.message);
        },
    });

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        if (!formData.branch_id || !formData.company_id) {
            console.error("branch_id y company_id son obligatorios");
            return;
        }

        mutate({
            name: formData.name,
            last_name: formData.last_name,
            email: formData.email,
            password: formData.password,
            rol_id: formData.rol_id,
            branch_id: formData.branch_id,
            company_id: formData.company_id,
        });
    }

    return (
        <ModalLayout isOpen={isOpen} onClose={onClose} title="Crear cuenta">
            <form onSubmit={handleSubmit} className="flex flex-col gap-4 text-sm">
                <div className="flex gap-4 items-center">
                    <div className="flex flex-col gap-2">
                        <label className="font-medium text-neutral-600">Nombre *</label>
                        <input 
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            className="w-full p-3 rounded-lg border border-neutral-200 focus:border-cyan-400 focus:ring-4 focus:ring-cyan-400/5 outline-none transition-colors duration-200 ease-in-out"
                        />
                    </div>
                    <div className="flex flex-col gap-2">
                        <label className="font-medium text-neutral-600">Apellido *</label>
                        <input 
                            type="text"
                            name="last_name"
                            value={formData.last_name}
                            onChange={handleInputChange}
                            className="w-full p-3 rounded-lg border border-neutral-200 focus:border-cyan-400 focus:ring-4 focus:ring-cyan-400/5 outline-none transition-colors duration-200 ease-in-out"
                        />
                    </div>
                </div>

                <div className="flex flex-col gap-2">
                    <label className="font-medium text-neutral-600">Correo electrónico *</label>
                    <input 
                        type="email" 
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full p-3 rounded-lg border border-neutral-200 focus:border-cyan-400 focus:ring-4 focus:ring-cyan-400/5 outline-none transition-colors duration-200 ease-in-out"
                    />
                </div>

                <div className="flex flex-col gap-2">
                    <label className="font-medium text-neutral-600">Contraseña *</label>
                    <input 
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleInputChange}
                        className="w-full p-3 rounded-lg border border-neutral-200 focus:border-cyan-400 focus:ring-4 focus:ring-cyan-400/5 outline-none transition-colors duration-200 ease-in-out"
                    />
                    <span className="text-xs text-neutral-500">
                        Mínimo 8 caracteres, un número y un carácter especial.
                    </span>
                </div>

                <div className="w-1/2 flex gap-4">
                    <CustomSelect
                        isDisabled={false}
                        label="Rol *"
                        placeholder="Selecciona un rol"
                        options={[
                            { value: "2", label: "Gerente" },
                            { value: "3", label: "Cajero" }
                        ]}
                        value={formData.rol_id}
                        onChange={(value) => setFormData({ ...formData, rol_id: value })}
                    />
                </div>

                <div className="flex justify-end gap-4 mt-4">
                    <button
                        type="button"
                        onClick={onClose}
                        className="px-4 py-2 rounded-lg border border-neutral-200 text-neutral-600 hover:bg-neutral-50 transition-colors ease-in-out duration-200 cursor-pointer"
                    >
                        Cancelar
                    </button>
                    <button
                        type="submit"
                        disabled={isPending}
                        className={`px-4 py-2 rounded-lg text-white font-medium transition-colors ease-in-out duration-200 ${
                            isPending
                                ? "bg-neutral-400 cursor-not-allowed"
                                : "bg-cyan-400 hover:bg-cyan-500 cursor-pointer"
                        }`}
                    >
                        {isPending ? 'Guardando cuenta' : 'Guardar cuenta'}
                    </button>
                </div>
            </form>
        </ModalLayout>
    );
};