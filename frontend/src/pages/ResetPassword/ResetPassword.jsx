import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Logo from "../../../imgs/logomaxxing.svg";
import toast from "react-hot-toast";
import { supabase } from "../../../utils/supabaseClient.js";
import { useLanguage } from "../../context/LanguageContext.jsx";
import { Link } from "react-router-dom";

export default function ResetPassword(){
    const { idioma } = useLanguage();
    const isEnglish = idioma === "en";

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [type, setType] = useState("password");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleType = () => {
    setType((prev) => (prev === "password" ? "text" : "password"));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password.length < 6){
      return toast.error(isEnglish ? "Password must be at least 6 characters long" : "La contraseña debe tener al menos 6 caracteres");
    }

    if (password !== confirmPassword){
      return toast.error(isEnglish ? "Passwords do not match" : "Las contraseñas no coinciden")
    }

    const toastId = toast.loading(isEnglish ? "Updating password..." : "Actualizando contraseña...");

    try {
      setLoading(true);

      const { error } = await supabase.auth.updateUser({
         password: password
      });

      if (error){
        toast.error(isEnglish ? "Error: " + error.message : "Error: " + error.message, { id: toastId});
      } else{
        toast.success(isEnglish ? "Password updated successfully!" : "¡Contraseña actualizada con éxito!", { id: toastId});
        setTimeout(() => navigate("/auth/login"), 2000);
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

       <div className="bg-linear-to-br from-yellow-500 via-amber-600 to-orange-600 rounded-2xl px-4 py-6 sm:px-8 sm:py-10 flex flex-col items-center gap-4">
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
                    {isEnglish ? "New Password" : "Nueva contraseña"}
                </h3>
                <p className="text-base md:text-lg text-white/90 font-light max-w-sm mx-auto">
                    {isEnglish ? "You're almost done. Enter your new password to return to ManzaLife." : "Ya casi terminas. Escribe tu nueva contraseña para volver a ManzaLife."}
                </p>
            </div>

            <div className="flex flex-col gap-4 text-white mt-2">
               <div className="relative">
                 <input 
                   className="w-full px-4 py-3 bg-white/20 border border-white/40 outline-none rounded-2xl placeholder-white/70 text-lg font-light focus:border-white focus:bg-white/30 transition-all duration-200"
                   type={type}
                   placeholder={isEnglish ? "New Password" : "Nueva contraseña"}
                   value={password}
                   onChange={(e) => setPassword(e.target.value)}
                   required
                />
                <div
                   onClick={handleType}
                   className="absolute right-5 top-1/2 -translate-y-1/2 cursor-pointer text-white/80 hover:text-white"
                   >
                    {type === "password" ? <FaEye size={20} /> : <FaEyeSlash size={20} />}
                   </div>
               </div>

               <input 
                  className="w-full px-4 py-3 bg-white/20 border border-white/40 outline-none rounded-2xl placeholder-white/70 text-lg font-light focus:border-white focus:bg-white/30 transition-all duration-200"
                  type={type}
                  placeholder={isEnglish ? "Confirm Password" : "Confirmar contraseña"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
            </div>

            <button 
               type="submit"
               disabled={loading}
               className={`mt-2 rounded-2xl bg-zinc-950 text-white text-lg duration-200 ease-in-out transition-all px-4 py-3 tracking-wider border border-transparent shadow-xl ${loading ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer hover:text-orange-600 hover:bg-black hover:shadow-2xl hover:-translate-1 active:scale-95'}`}
               >
                {loading ? (isEnglish ? "Saving..." : "Guardando...") : (isEnglish ? "Update Password" : "Actualizar contraseña")}
               </button>
          </form>  
       </div>
    </div>
  );
}