import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { FaChevronLeft, FaChevronRight, FaArrowRight } from "react-icons/fa";
import { useAuth } from "../../context/AuthContext";
import Logo from "../../../imgs/logomaxxing.svg";
import { sliderContent } from "./sliderContent";
import { StepOne, StepTwo } from "../../components/Register/index";
import validatePassword from "../../../utils/validatePassword.js";
import { supabase } from "../../../utils/supabaseClient.js";
import { useLanguage } from "../../context/LanguageContext";

export default function Register() {
    const { textos } = useLanguage();
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

    const [type, setType] = useState("password");
    const [loading, setLoading] = useState(false);
    const [currentSlider, setCurrentSlider] = useState(0);
    const [formStep, setFormStep] = useState(1);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleCurrentSlider = (direction) => {
        if (direction === "next") {
            setCurrentSlider((prev) =>
                prev >= sliderContent.length - 1 ? 0 : prev + 1
            );
        } else {
            setCurrentSlider((prev) =>
                prev === 0 ? sliderContent.length - 1 : prev - 1
            );
        }
    };

    const handleFormStep = () => {
        if (!formData.first_name.trim())
            return toast.error(textos.register.nombre_required);
        if (!formData.last_name.trim())
            return toast.error(textos.register.apellido_required);
        if (!formData.username.trim())
            return toast.error(textos.register.usuario_required);

        setFormStep(2);
    };

    const handleType = () =>
        setType(type === "password" ? "text" : "password");

    const handleRegister = async (e) => {
        if (e) e.preventDefault();

        if (!formData.email.trim())
            return toast.error(textos.register.email_required);
        if (!formData.password)
            return toast.error(textos.register.password_required);
        if (!formData.password_confirm)
            return toast.error(textos.register.password_confirm_required);
        if (formData.password !== formData.password_confirm)
            return toast.error(textos.register.password_match);
        if (!validatePassword(formData.password))
            return toast.error(textos.register.password_secure);

        const toastId = toast.loading(textos.register.loading);

        try {
            setLoading(true);

            const { error: authError } = await supabase.auth.signUp({
                email: formData.email,
                password: formData.password,
            });

            if (authError) {
                toast.error(authError.message, { id: toastId });
                setLoading(false);
                return;
            }

            const res = await register(formData);

            if (res.success) {
                toast.success(textos.register.success, { id: toastId });
                navigate("/auth/login");
            } else {
                toast.error(res.message || textos.register.error);
            }
        } catch (error) {
            toast.error(textos.register.error, { id: toastId });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-linear-to-br from-yellow-500 via-amber-600 to-orange-600 shadow-lg shadow-zinc-950/80 max-w-3xl flex flex-col md:flex-row rounded-2xl overflow-hidden p-2">
            
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
                            <img src={Logo} alt="Logo" className="h-10 object-cover" />
                        </Link>

                        <Link to={"/blog"} className="text-sm text-white/80 hover:text-white flex items-center gap-2">
                            <span>{textos.auth.ir_blog}</span>
                            <FaArrowRight />
                        </Link>
                    </div>

                    <div className="flex justify-end">
                        <p className="text-white/80 text-xs italic leading-relaxed">
                            {sliderContent[currentSlider].Quote}
                        </p>
                    </div>
                </div>

                <button
                    onClick={() => handleCurrentSlider("prev")}
                    className="absolute z-30 left-2 top-1/2 -translate-y-1/2 p-2 bg-white/10 hover:bg-white/20 rounded-full text-white"
                >
                    <FaChevronLeft />
                </button>

                <button
                    onClick={() => handleCurrentSlider("next")}
                    className="absolute z-30 right-2 top-1/2 -translate-y-1/2 p-2 bg-white/10 hover:bg-white/20 rounded-full text-white"
                >
                    <FaChevronRight />
                </button>
            </div>

            <div className="w-full md:w-3/5 flex justify-center">
                <div className="h-full w-full px-4 md:px-8 lg:px-12 py-6 sm:py-8 flex flex-col gap-6 justify-center">
                    
                    <div className="space-y-4">
                        <Link to={"/blog"} className="md:hidden text-sm text-white/80 hover:text-white flex items-center gap-2">
                            <FaArrowRight className="rotate-180" />
                            <span>{textos.auth.ir_al_blog}</span>
                        </Link>

                        <div className="flex items-center justify-center">
                            {[1, 2].map((item) => (
                                <div key={item} className="flex items-center">
                                    <div className={`size-8 rounded-full flex items-center justify-center border ${formStep === item ? 'bg-white text-orange-600' : 'text-white/30 border-white/20'}`}>
                                        {item}
                                    </div>
                                    {item < 2 && <div className={`w-6 h-px ${formStep > item ? "bg-white/40" : "bg-white/10"}`} />}
                                </div>
                            ))}
                        </div>

                        <h3 className="text-2xl md:text-3xl text-center md:text-left font-semibold">
                            {formStep === 1 && textos.register.titulo}
                            {formStep === 2 && textos.register.casi_listo}
                        </h3>
                    </div>

                    <form onSubmit={handleRegister} className="flex flex-col gap-6">
                        {formStep === 1 && <StepOne formData={formData} handleChange={handleChange} />}
                        {formStep === 2 && <StepTwo formData={formData} handleChange={handleChange} type={type} handleType={handleType} />}

                        <div className="flex flex-col md:flex-row gap-2">
                            {formStep === 2 && (
                                <button
                                    type="button"
                                    onClick={() => setFormStep(1)}
                                    className="w-full border border-white rounded-xl py-2"
                                >
                                    {textos.register.regresar}
                                </button>
                            )}

                            <button
                                type="button"
                                onClick={formStep === 2 ? handleRegister : handleFormStep}
                                className="w-full bg-zinc-950 rounded-xl py-2"
                            >
                                {formStep === 1
                                    ? textos.register.siguiente
                                    : textos.register.crear_cuenta}
                            </button>
                        </div>

                        <p className="text-sm text-center">
                            {textos.register.ya_tienes}{" "}
                            <Link to={"/auth/login"}>
                                {textos.register.inicia_sesion}
                            </Link>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    );
}