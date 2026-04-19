import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { FaChevronLeft, FaChevronRight, FaArrowRight } from "react-icons/fa";
import { useAuth } from "../../context/AuthContext";
import Logo from "../../../imgs/logomaxxing.svg";
import { sliderContent } from "./sliderContent";
import { StepOne, StepTwo } from "../../components/Register/index"
import validatePassword from "../../../utils/validatePassword.js"
import { supabase } from "../../../utils/supabaseClient.js"

export default function Register() {
    const { register } = useAuth();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        first_name: "",
        last_name: "",
        username: "",
        email: "",
        password: "",
        password_confirm: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const [type, setType] = useState("password");
    const [loading, setLoading] = useState(false);

    // Slider Variables and functions
    const [currentSlider, setCurrentSlider] = useState(0);

    const handleCurrentSlider = (direction) => {
        if (direction === "next") {
            setCurrentSlider((prev) => prev >= sliderContent.length - 1 ? 0 : prev + 1)
        } else {
            setCurrentSlider((prev) => prev === 0 ? sliderContent.length - 1 : prev - 1)
        }
    }
    
    // Form Step variables and functions
    const [formStep, setFormStep] = useState(1);

    const handleFormStep = () => {
        if (formStep === 1) {
            if (!formData.first_name.trim()) return toast.error("El nombre es obligatorio");
            if (!formData.last_name.trim()) return toast.error("El apellido es obligatorio");
            if (!formData.username.trim()) return toast.error("El usuario es obligatorio");
        
            setFormStep(2);
        }
    }

    const handleType = () => setType(type === "password" ? "text" : "password");

    const handleRegister = async (e) => {
        if (e) e.preventDefault();

        if (!formData.email.trim()) return toast.error("El correo electrónico es obligatorio");
        if (!formData.password) return toast.error("La contraseña es obligatoria");
        if (!formData.password_confirm) return toast.error("Debes confirmar tu contraseña");
        if (formData.password !== formData.password_confirm) return toast.error("Las contraseñas no coinciden");
        if (!validatePassword(formData.password)) return toast.error("Contraseña insegura: debe contener 8 caracteres, al menos un símbolo y un número")

        const toastId = toast.loading("Creando cuenta...");

        try {
            setLoading(true);
            
            const { data: authData, error: authError } = await supabase.auth.signUp({
              email: formData.email,
              password: formData.password,
            })
            
            if (authError) {
              toast.error("Error de seguridad: " + authError.message, { id: toastId })
              setLoading(false)
              return
            }

            const res = await register(formData);

            if (res.success) {
                toast.success("¡Cuenta creada exitosamente!", { id: toastId });
                navigate("/auth/login");
            } else {
                toast.error(res.message || "Error al crear la cuenta");
            }
        } catch (error) {
          toast.error(`Hubo un error inesperado. ${error}`, { id: toastId })
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-linear-to-br from-yellow-500 via-amber-600 to-orange-600 shadow-lg shadow-zinc-950/80 max-w-3xl flex flex-col md:flex-row rounded-2xl overflow-hidden p-2">
            {/* Slider */}
            <div className="relative hidden md:flex w-1/2 rounded-2xl overflow-hidden">
                <img
                    className="h-full w-full object-cover"
                    src={sliderContent[currentSlider].Image}
                    alt="Branding"
                />

                <div className="absolute inset-0 bg-linear-to-b from-black/50 via-black/20 to-black/50" />

                <div className="absolute inset-0 z-20 flex flex-col justify-between p-5">
                    <div className="flex justify-between items-center">
                        <Link to={"/"}>
                            <img
                                src={Logo}
                                alt="Logo"
                                className="h-10 object-cover"
                            />
                        </Link>
                        <Link
                            to={"/blog"}
                            className="text-sm text-white/80 hover:text-white flex items-center gap-2">
                            <span>Ir al blog</span>
                            <FaArrowRight/>
                        </Link>
                    </div>
                    <div className="flex justify-end">
                        <p className="text-white/80 text-xs italic leading-relaxed">
                            {sliderContent[currentSlider].Quote}
                        </p>
                    </div>
                </div>

                {/* Flechas Slider */}
                <button
                    onClick={() => handleCurrentSlider("prev")}
                    className="absolute z-30 left-2 top-1/2 -translate-y-1/2 p-2 bg-white/10 hover:bg-white/20 rounded-full text-white transition-all ease-in-out duration-200 cursor-pointer"
                >
                    <FaChevronLeft className="text-xl" />
                </button>
                <button
                    onClick={() => handleCurrentSlider("next")}
                    className="absolute z-30 right-2 top-1/2 -translate-y-1/2 p-2 bg-white/10 hover:bg-white/20 rounded-full text-white transition-all ease-in-out duration-200 cursor-pointer"
                >
                    <FaChevronRight className="text-xl" />
                </button>
            </div>

            <div className="w-full md:w-3/5 flex justify-center">
                <div className="h-full w-full px-4 md:px-8 lg:px-12 py-6 sm:py-8 flex flex-col gap-6 justify-center">
                    <div className="space-y-4">
                        <Link
                            to={"/blog"}
                            className="md:hidden text-sm text-white/80 hover:text-white flex items-center gap-2">
                            <FaArrowRight className="rotate-180" />
                            <span>Ir al inicio</span>
                        </Link>

                        {/* Pasos */}
                        <div className="flex items-center justify-center">
                            {
                                [1, 2].map((item) => {
                                    return (
                                        <div key={item} className="flex items-center">
                                            <div
                                                key={item}
                                                className={`size-8 rounded-full flex items-center justify-center border border-white transition-all ${formStep == item ? 'bg-white text-orange-600 border-white font-medium' : 'border-white/20 text-white/30'}`}>
                                                    <span className="text-sm">{item}</span>
                                            </div>
                                            {/* // Dibujamos linea */}
                                            {
                                                item < 2 && (
                                                    <div className={`w-6 h-px ${formStep > item ? "bg-white/40" : "bg-white/10"}`}/>
                                                )
                                            }
                                        </div>
                                    )
                                })
                            }
                        </div>

                        <h3 className="text-2xl md:text-3xl text-center md:text-left font-semibold tracking-wide">
                            { formStep === 1 && 'Crear cuenta' }
                            { formStep === 2 && '¡Casi listo!' }
                        </h3>
                    </div>

                    <form onSubmit={handleRegister} className="h-full flex flex-col gap-6">
                        { formStep === 1 && <StepOne formData={formData} handleChange={handleChange}/>}
                        { formStep === 2 && <StepTwo formData={formData} handleChange={handleChange} type={type} handleType={handleType}/>}

                        <div className="flex flex-col md:flex-row gap-2">
                            {
                                formStep === 2 && (
                                    <button
                                    disabled={loading}
                                    type="button"
                                    onClick={() => setFormStep(prev => prev - 1)}
                                    className="w-full rounded-xl border border-white hover:text-zinc-950 hover:-translate-y-1 duration-200 ease-in-out transition-all px-6 py-2 tracking-wide cursor-pointer">
                                        <span>Regresar</span>
                                    </button>
                                )
                            }
                            <button
                                disabled={loading}
                                type="button"
                                onClick={ formStep === 2 ? handleRegister : handleFormStep }
                                className={`w-full rounded-xl bg-zinc-950 duration-200 ease-in-out transition-all px-6 py-2 tracking-wide cursor-pointer ${loading ? '' : 'hover:text-orange-600 hover:-translate-y-1'}`}>
                                <span>{ formStep === 1 ? 'Siguiente' : 'Crear cuenta' }</span>
                            </button>
                        </div>

                        <p className="text-sm text-center tracking-wider">¿Ya tienes cuenta?{" "}
                            <Link
                                to={"/auth/login"}
                                className="hover:text-zinc-950 hover:underline transition-colors duration-200 ease-in-out">
                                <span>Inicia sesión</span>
                            </Link>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    );
}
