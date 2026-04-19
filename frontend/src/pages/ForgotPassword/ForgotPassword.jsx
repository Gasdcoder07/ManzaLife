import { useEffect, useState } from "react";
import api from "../../api/axios.js"
import toast from "react-hot-toast";
import { supabase } from "../../../utils/supabaseClient.js"

export default function ForgotPassword() {
  
    const [emailInput, setEmailInput] = useState("")
    const [email, setEmail] = useState([])

    useEffect(() => {
      const getEmails = async () => {
        try {
          const response = await api.get("/usuarios/")
          const list = response.data.map(u => u.email)
          setEmail(list)
        } 
        catch (error) {
          console.log(error)
        }
      }
      getEmails()
    }, [])

    const handleChange = (e) => {
      setEmailInput(e.target.value)
    }

    const handleSubmmit = async (e) => {
      e.preventDefault()
      if (email.includes(emailInput)) {
        toast.success("si existe")
        const { error } = await supabase.auth.resetPasswordForEmail(emailInput, {
          redirectTo: 'http://localhost:5173/auth/resetpassword',
        })
        if (error) {
          toast.error("Error: " + error.message)
        } else {
          toast.success("!Revisa tu bandeja de entrada!")
        }
      } else {
        toast.error("Lo siento pero no existe ese correo")
      }
    }

    return (
        <div className="bg-linear-to-br from-yellow-500 via-amber-600 to-orange-600 shadow-lg shadow-zinc-950/80 max-w-3xl flex flex-col md:flex-row rounded-2xl overflow-hidden p-2">
            <div className="w-full flex justify-center min-w-5">
              <h1 className="font-bold text-white">Recupera tu contraseña w</h1>
              <input 
                type="email" 
                placeholder="Escribe tu correo" 
                value={emailInput}
                onChange={handleChange}
              />
              <button type="button" onClick={handleSubmmit}>suscribete :)</button>
            </div>
        </div>
    );
}
