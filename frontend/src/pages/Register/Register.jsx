import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { FaEye, FaEyeSlash, FaArrowRight } from "react-icons/fa";
import SideImage from "../../../imgs/RegisterResourcers/atardecer.png";
import Logo from "../../../imgs/logomaxxing.svg";
import { useAuth } from "../../context/AuthContext";

export default function Register() {
    const { register } = useAuth();

    const [formData, setFormData] = useState({
        first_name: "",
        last_name: "",
        username: "",
        email: "",
        password: "",
        password_confirm: ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value}));
    }

    const [type, setType] = useState("password");
    const [loading, setLoading] = useState(false);

    const handleType = () => {
        setType((prev) => (prev === "password" ? "text" : "password"));
    };

    const handleRegister = async (e) => {
        e.preventDefault();

        if (!formData.first_name) return toast.error("El nombre es obligatorio");
        if (!formData.last_name) return toast.error("El apellido es obligatorio");
        if (!formData.username) return toast.error("El usuario es obligatorio");
        if (!formData.email) return toast.error("El correo electrónico es obligatorio");
        if (!formData.password) return toast.error("La contraseña es obligatoria");
        if (!formData.password_confirm) return toast.error("Debes confirmar tu contraseña");
        if (formData.password !== formData.password_confirm) return toast.error("Las contraseñas no coinciden");

        try {
            setLoading(true);
            const res = await register(formData);
            if (res.success) {
                toast.success("Cuenta creada");
            } else {
                toast.error(res.message || "Error al crear la cuenta");
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-linear-to-br from-yellow-500 via-amber-600 to-orange-600 shadow-lg shadow-zinc-950/80 max-w-3xl flex flex-col md:flex-row rounded-2xl overflow-hidden p-2">
            <div className="hidden md:flex relative w-full rounded-2xl md:w-1/2 overflow-hidden">
                <img
                    className="h-full w-full object-cover"
                    src={SideImage}
                    alt="Side Image"
                />

                <div className="absolute inset-0 bg-linear-to-b from-black/30 via-black/45 to-black/60" />

                <div className="absolute inset-0 z-20 flex flex-col justify-between px-6 py-4">
                    <div className="flex justify-between items-center">
                        <img
                            className="h-10 object-cover"
                            src={Logo}
                            alt="ManzaLife"
                        />

                        <Link
                            to={"/"}
                            className="bg-zinc-950 px-3 py-1 rounded-xl flex gap-2 justify-center items-center hover:text-orange-600 hover:-translate-y-1 duration-200 ease-in-out transition-all"
                        >
                            <span>Explorar el sitio</span>
                            <FaArrowRight />
                        </Link>
                    </div>

                    <div className="flex justify-center">
                        <span className="px-2 py-1 text-white/90 text-sm sm:text-xl text-center w-56 tracking-wider font-light">
                            Descubre lugares, explora sentimientos.
                        </span>
                    </div>
                </div>
            </div>
            <div className="w-full md:w-1/2 flex justify-center">
                <form
                    onSubmit={handleRegister}
                    className="text-white w-full px-4 md:px-8 lg:px-12 py-6 sm:py-10 flex flex-col gap-6 justify-center"
                >
                    <div className="space-y-2">
                        <Link
                            to={"/"}
                            className="text-sm text-white/80 hover:text-white flex md:hidden items-center gap-2"
                        >
                            <FaArrowRight className="rotate-180" />
                            <span>Volver al inicio</span>
                        </Link>

                        <h3 className="text-2xl md:text-3xl text-center md:text-left font-semibold tracking-wide">
                            Crea una cuenta
                        </h3>
                    </div>

                    <div className="flex flex-col gap-4 text-white">
                        <div className="w-full flex gap-2">
                            <input
                                name="firstName"
                                placeholder="Nombre"
                                className="w-1/2 px-3 py-1.5 border border-white outline-none rounded-lg placeholder-white/80"
                                type="text"
                                value={formData.firstName}
                                onChange={handleChange}
                            />
                            <input
                                name="lastName"
                                placeholder="Apellidos"
                                className="w-1/2 px-3 py-1.5 border border-white outline-none rounded-lg placeholder-white/80"
                                type="text"
                                value={formData.lastName}
                                onChange={handleChange}
                            />
                        </div>

                        <input
                            name="username"
                            className="px-3 py-1.5 border border-white outline-none rounded-lg placeholder-white/80"
                            type="text"
                            placeholder="Usuario"
                            value={formData.username}
                            onChange={handleChange}
                        />

                        <input
                            name="email"
                            className="px-3 py-1.5 border border-white outline-none rounded-lg placeholder-white/80"
                            type="email"
                            placeholder="Correo electrónico"
                            value={formData.email}
                            onChange={handleChange}
                        />

                        <div className="relative">
                            <input
                                name="password"
                                className="pl-3 pr-10 py-1.5 border border-white outline-none rounded-lg placeholder-white/80 w-full"
                                type={type}
                                placeholder="Contraseña"
                                value={formData.password}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="relative">
                            <input
                                name="passwordConfirm"
                                className="pl-3 pr-10 py-1.5 border border-white outline-none rounded-lg placeholder-white/80 w-full"
                                type={type}
                                placeholder="Confirma tu contraseña"
                                value={formData.passwordConfirm}
                                onChange={handleChange}
                            />

                            {type === "password" ? (
                                <FaEye
                                    onClick={() => handleType()}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer"
                                />
                            ) : (
                                <FaEyeSlash
                                    onClick={() => handleType()}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer ease-in-out transition-colors duration-200"
                                />
                            )}
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="rounded-lg bg-zinc-950 hover:text-orange-600 hover:-translate-y-1 duration-200 ease-in-out transition-all px-6 py-2 tracking-wide cursor-pointer"
                    >
                        Crear cuenta
                    </button>

                    <p className="text-sm text-center tracking-wider">
                        ¿Ya tienes cuenta?{" "}
                        <Link
                            to={"/auth/login"}
                            className="hover:text-zinc-950 hover:underline transition-colors duration-200 ease-in-out"
                        >
                            Inicia sesión
                        </Link>
                    </p>
                </form>
            </div>
        </div>
    );
}
