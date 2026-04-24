import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Logo from "../../../imgs/logomaxxing.svg";
import toast from "react-hot-toast";
import { supabase } from "../../../utils/supabaseClient.js";

export default function ResetPassword(){
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
      return toast.error("La contraseña debe tener al menos 6 caracteres");
    }

    if (password !== confirmPassword){
      return toast.error("Las contraseñas no coinciden")
    }

    const toastId = toast.loading("Actualizando contraseña...");

    try {
      setLoading(true);

      const { error } = await supabase.auth.updateUser({
         password: password
      });

      if (error){
        toast.error("Error: " + error.message, { id: toastId});
      } else{
        toast.success("¡Contraseña actualizada con éxito!", { id: toastId});
        setTimeout(() => navigate("/auth/login"), 2000);
      }
    } catch (err) {
      console.log(err.message);
      toast.error("Ocurrió un error inesperado", { id: toastId });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-zinc-950 shadow-2xl shadow-orange-600/20 max-w-xl w-full rounded-3xl p-[2px] mx-auto">

       <div className="bg-linear-to-br from-yellow-500 via-amber-600 to-orange-600 rounded-[22px] px-8 py-12 sm:px-14 sm:py-20 flex flex-col items-center">
         <div className="mb-10">
            <img 
              className="h-14 object-cover drop-shadow-lg"
              src={Logo}
              alt="ManzaLife"
            />
         </div>

         <form 
            onSubmit={handleSubmit}
            className="text-white w-full flex flex-col gap-6"
         >
            <div className="space-y-3 text-center">
                <h3 className="text-3xl md:text-4xl font-bold tracking-wide drop-shadow-sm">
                    Nueva contraseña
                </h3>
                <p className="text-base md:text-lg text-white/90 font-light max-w-sm mx-auto">
                    Ya casi terminas. Escribe tu nueva contraseña para volver a ManzaLife.
                </p>
            </div>

            <div className="flex flex-col gap-4 text-white mt-4">
               <div className="relative">
                 <input 
                   className="w-full px-6 py-4 bg-white/20 border border-white/40 outline-none rounded-2xl placeholder-white/70 text-lg font-light focus:border-white focus:bg-white/30 transition-all duration-200"
                   type={type}
                   placeholder="Nueva contraseña"
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
                  className="w-full px-6 py-4 bg-white/20 border border-white/40 outline-none rounded-2xl placeholder-white/70 text-lg font-light focus:border-white focus:bg-white/30 transition-all duration-200"
                  type={type}
                  placeholder="Confirmar contraseña"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
            </div>

            <button 
               type="submit"
               disabled={loading}
               className={`mt-4 rounded-2xl bg-zinc-950 text-white text-lg duration-200 ease-in-out transition-all px-8 py-4 tracking-wider font-bold border border-transparent shadow-xl ${loading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-black hover:shadow-2xl hover:-translate-1 active:scale-95'}`}
               >
                {loading ? "Guardando..." : "Actualizar contraseña"}
               </button>
          </form>  
       </div>
    </div>
  );
}