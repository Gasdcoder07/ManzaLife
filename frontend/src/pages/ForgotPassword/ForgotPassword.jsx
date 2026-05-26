import { useState } from "react";
import { Link } from "react-router-dom";
import Logo from "../../../imgs/logomaxxing.svg";
import toast from "react-hot-toast";
import { supabase } from "../../../utils/supabaseClient.js";
import { useLanguage } from "../../context/LanguageContext.jsx"

export default function ForgotPassword() {
    const { idioma } = useLanguage();
    const isEnglish = idioma === "en";

    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!email.trim()) {
            return toast.error(isEnglish ? "Please enter your email address" : "Ingresa tu correo electrónico");
        }
        
        const toastId = toast.loading(isEnglish ? "Sending link..." : "Enviando enlace...");

        try {
            setLoading(true);
            const { error } = await supabase.auth.resetPasswordForEmail(email, {
                redirectTo: 'https://manza-life.vercel.app/auth/resetpassword',
            });

            if (error) {
                toast.error(isEnglish ? "Error: " + error.message : "Error: " + error.message, { id: toastId });
            } else {
                toast.success(isEnglish ? "Check your inbox!" : "¡Revisa tu bandeja de entrada!", { id: toastId });
                setEmail(""); 
            }
        } catch (err) {
            console.log(err.message);
            toast.error(isEnglish ? "An unexpected error occurred" : "Ocurrió un error inesperado", { id: toastId });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="shadow-xl max-w-lg w-full mx-auto">
            
            <div className="w-full bg-linear-to-br from-yellow-500 via-amber-600 to-orange-600 rounded-2xl px-4 py-6 sm:px-8 sm:py-10 flex flex-col items-center gap-4">
                <Link to={"/"} className="focus:outline-none hover:scale-105 transition-transform duration-300">
                    <img
                        className="h-14 object-cover"
                        src={Logo}
                        alt="ManzaLife"
                    />
                </Link>

                <form
                    onSubmit={handleSubmit}
                    className="text-white w-full flex flex-col gap-4"
                >
                    <div className="space-y-2 text-center">
                        <h3 className="text-2xl md:text-4xl font-semibold tracking-wide">
                            {isEnglish ? "Retrieve your account" : "Recupera tu cuenta"}
                        </h3>
                        <p className="text-base md:text-lg text-white/90 font-light max-w-sm mx-auto leading-relaxed">
                            {isEnglish ? "Enter your email and we'll send you instructions to reset your password." : "Ingresa tu correo y te enviaremos instrucciones para reestablecer tu contraseña."}
                        </p>
                    </div>

                    <div className="flex flex-col gap-4 text-white mt-2">
                        <input
                            className="w-full px-4 py-3 bg-white/20 border border-white/40 outline-none rounded-2xl placeholder-white/70 text-lg font-light focus:border-white focus:bg-white/30 focus:ring-4 focus:ring-white/10 transition-all duration-200"
                            type="email"
                            placeholder={isEnglish ? "Email address" : "Correo electrónico"}
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className={`mt-2 rounded-2xl bg-zinc-950 text-white text-lg duration-200 ease-in-out transition-all px-4 py-3 tracking-wider  border border-transparent shadow-xl ${loading ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer hover:bg-black hover:shadow-2xl hover:-translate-y-1 active:scale-95 hover:text-orange-600'}`}
                    >
                        {loading ? (isEnglish ? "Sending..." : "Enviando...") : (isEnglish ? "Send Link" : "Enviar enlace")}
                    </button>
                    
                    <div className="flex flex-col justify-center items-center gap-1">
                        <p>
                            {isEnglish ? "Already remeber your password?" : "¿Ya la recordaste?"}
                        </p>
                        <span>
                            <Link
                                to={"/auth/login"}
                                className="text-zinc-950 hover:text-white hover:underline transition-colors duration-200 ease-in-out font-bold"
                            >
                                {isEnglish ? "Sign In" : "Iniciar Sesión"}
                            </Link>
                        </span>
                    </div>
                </form>
            </div>
        </div>
    );
}