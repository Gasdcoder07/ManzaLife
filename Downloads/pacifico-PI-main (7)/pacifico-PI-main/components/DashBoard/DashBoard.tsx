import { UserProfile } from "@/features/auth/types/authInterfaces"

const capitalize = (text?: string | null) =>
    text ? text.charAt(0).toUpperCase() + text.slice(1) : "Null";

const ROLES: Record<number, string> = {
    1: "Administrador",
    2: "Gerente",
    3: "Cajero",
};

export const DashBoard = ({ user }: { user: UserProfile | null | undefined }) => {

    const formattedInfo = {
        name: capitalize(user?.name),
        last_name: capitalize(user?.last_name),
        status: user?.status === true ? "Activo" : "Inactivo",
        rol: user?.rol_id ? ROLES[user.rol_id] ?? null : null,
    }

    return (
        <section
            className="w-[80%] min-h-10 bg-gray-50 border border-zinc-50 rounded-2xl shadow-2xs p-8"
        >
            <h1>Bienvenido {formattedInfo.name}</h1>
        </section>
    )
}