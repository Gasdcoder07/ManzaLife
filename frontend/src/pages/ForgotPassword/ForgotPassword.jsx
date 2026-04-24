import { useState } from "react";
import { Link } from "react-router-dom";
import Logo from "../../../imgs/logomaxxing.svg";
import toast from "react-hot-toast";
import { supabase } from "../../../utils/supabaseClient.js";

export default function ForgotPassword() {
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!email.trim()) {
            return toast.error("Ingresa tu correo electrónico");
        }
        
        const toastId = toast.loading("Enviando enlace...");

        try {
            setLoading(true);
            const { error } = await supabase.auth.resetPasswordForEmail(email, {
                redirectTo: 'http://localhost:5173/auth/resetpassword',
            });

            if (error) {
                toast.error("Error: " + error.message, { id: toastId });
            } else {
                toast.success("¡Revisa tu bandeja de entrada!", { id: toastId });
                setEmail(""); 
            }
        } catch (err) {
            console.log(err.message);
            toast.error("Ocurrió un error inesperado", { id: toastId });
        } finally {
            setLoading(false);
        }
    };

    return (
        /* Borde exterior oscuro - Tamaño ajustado a max-w-xl */
        <div className="bg-zinc-950 shadow-2xl shadow-orange-600/20 max-w-xl w-full rounded-3xl p-[2px] mx-auto">
            
            {/* EL RECTÁNGULO NARANJA: Padding equilibrado (py-12 px-8 a sm:py-20 sm:px-14) */}
            <div className="bg-linear-to-br from-yellow-500 via-amber-600 to-orange-600 rounded-[22px] px-8 py-12 sm:px-14 sm:py-20 flex flex-col items-center">
                
                <Link to={"/"} className="mb-10 focus:outline-none hover:scale-105 transition-transform duration-300">
                    <img
                        className="h-14 object-cover drop-shadow-lg"
                        src={Logo}
                        alt="ManzaLife"
                    />
                </Link>

                <form
                    onSubmit={handleSubmit}
                    className="text-white w-full flex flex-col gap-6"
                >
                    <div className="space-y-3 text-center">
                        <h3 className="text-3xl md:text-4xl font-bold tracking-wide drop-shadow-sm">
                            Recupera tu cuenta
                        </h3>
                        <p className="text-base md:text-lg text-white/90 font-light max-w-sm mx-auto leading-relaxed">
                            Ingresa tu correo y te enviaremos instrucciones para reestablecer tu contraseña.
                        </p>
                    </div>

                    <div className="flex flex-col gap-4 text-white mt-4">
                        <input
                            className="w-full px-6 py-4 bg-white/20 border border-white/40 outline-none rounded-2xl placeholder-white/70 text-lg font-light focus:border-white focus:bg-white/30 focus:ring-4 focus:ring-white/10 transition-all duration-200"
                            type="email"
                            placeholder="Correo electrónico"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className={`mt-4 rounded-2xl bg-zinc-950 text-white text-lg duration-200 ease-in-out transition-all px-8 py-4 tracking-wider font-bold border border-transparent shadow-xl ${loading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-black hover:shadow-2xl hover:-translate-y-1 active:scale-95'}`}
                    >
                        {loading ? "Enviando..." : "Enviar enlace"}
                    </button>
                    
                    <p className="text-sm md:text-base text-center tracking-wider mt-8 font-medium">
                        ¿Ya la recordaste?{" "}
                        <Link
                            to={"/auth/login"}
                            className="text-zinc-950 hover:text-white hover:underline transition-colors duration-200 ease-in-out font-bold"
                        >
                            Iniciar Sesión
                        </Link>
                    </p>
                </form>
            </div>
        </div>
    );
}