import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../../utils/supabaseClient.js";
import toast from "react-hot-toast";
import validatePassword from "../../../utils/validatePassword.js";
import api from "../../api/axios.js";

const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState("");
  const navigate = useNavigate();

  const handleUpdate = async (e) => {
    e.preventDefault();

    const errorValidacion = validatePassword(newPassword);

    if (errorValidacion) {
      return toast.error(errorValidacion);
    }

    const loadingToast = toast.loading("Actualizando contraseña..");
    
    const { data: userData, error: userError } = await supabase.auth.getUser();
    
    if (userError || !userData?.user) {
        toast.dismiss(loadingToast);
        return toast.error("Error de sesión. Por favor, solicita un nuevo enlace.");
    }
    
    const userEmail = userData.user.email;
    
    const { error: updateError } = await supabase.auth.updateUser({
      password: newPassword
    });

    if (updateError) {
      toast.dismiss(loadingToast);
      return toast.error("Error al actualizar la seguridad: " + updateError.message);
    }

    try {
    
      await api.patch('/usuarios/update-password/', {
        email: userEmail,
        nueva_password: newPassword
      });

      toast.dismiss(loadingToast);
      toast.success("¡Contraseña actualizada con éxito!");
      
      setTimeout(() => {
        navigate("/auth/login"); 
      }, 2000);

    } catch (backendError) {
      toast.dismiss(loadingToast);
      console.error(backendError);
      toast.error("Clave actualizada, pero hubo un error al sincronizar con el servidor.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-zinc-900 text-white">
        <form onSubmit={handleUpdate} className="bg-zinc-800 p-8 rounded-xl shadow-lg w-full max-w-md">
            <h1 className="text-xl font-bold mb-4 text-center">Ingresa tu nueva contraseña</h1>
            <input 
                type="password" 
                placeholder="Nueva contraseña"
                className="w-full p-2 mb-4 rounded text-black outline-none focus:ring-2 focus:ring-orange-500"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
            />
            <button type="submit" className="w-full bg-orange-600 hover:bg-orange-700 transition-colors p-2 rounded font-bold cursor-pointer">
                Guardar cambios
            </button>
        </form>
    </div>
  );
}

export default ResetPassword;
