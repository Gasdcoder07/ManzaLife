import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { FaArrowRight, FaEye, FaEyeSlash } from "react-icons/fa";
import { useAuth } from "../../context/AuthContext";
import SideImage from "../../../imgs/LoginResources/Login_hadas.jpeg";
import Logo from "../../../imgs/logomaxxing.svg";
import toast from "react-hot-toast";

export default function Login() {
    const [type, setType] = useState("password");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { login } = useAuth();

    const handleType = () => {
        setType((prev) => (prev === "password" ? "text" : "password"));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!username.trim() || !password.trim()) {
            return toast.error("Ingresa usuario y contraseña");
        }
        
        const toastId = toast.loading("Iniciando sesión");

        try {
            setLoading(true);
            const success = await login({ username, password });

            if (success) {
                toast.success("¡Sesión iniciada correctamente!", { id: toastId })
                navigate("/blog");
            } else {
                toast.error("Usuario o contraseña incorrectos", { id: toastId});
            }
        } catch (err) {
            console.log(err.message);
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
                            className="text-sm text-white/80 hover:text-white flex items-center gap-2">
                            <span>Volver al inicio</span>
                            <FaArrowRight/>
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
                    onSubmit={handleSubmit}
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
                            Accede a tu cuenta
                        </h3>
                    </div>

                    <div className="flex flex-col gap-4 text-white">
                        <input
                            className="w-full px-3 py-2 border border-white/40 outline-none rounded-xl placeholder-white/60 font-light"
                            type="text"
                            placeholder="Usuario"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />

                        <div className="relative">
                            <input
                                className="pl-3 pr-10 py-2 border border-white/40 outline-none rounded-xl placeholder-white/60 w-full font-light"
                                type={type}
                                placeholder="Contraseña"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
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
                        Ingresar
                    </button>

                    <p className="text-sm text-center tracking-wider">
                        ¿No tienes cuenta aún?{" "}
                        <Link
                            to={"/auth/register"}
                            className="hover:text-zinc-950 hover:underline transition-colors duration-200 ease-in-out"
                        >
                            Registrate
                        </Link>
                    </p>
                </form>
            </div>
        </div>
    );
}
