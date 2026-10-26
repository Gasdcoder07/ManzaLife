"use client"

import Link from "next/link";
import { useState } from "react";
import { LoadingIndicator } from "@/shared/components/LoadingIndicator";
import { useMutation } from '@tanstack/react-query';
import { Eye, EyeOff } from "lucide-react";
import { registerUser } from "@/features/auth/services/auth.service";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation"
import { useTranslations } from "next-intl";

const inputClass =
    "w-full p-3 pr-12 text-sm border border-neutral-300 rounded-xl hover:border-neutral-400 focus:border-cyan-400 focus:ring-4 focus:ring-cyan-400/5 outline-none transition-colors duration-200 ease-in-out";

const RegisterForm = () => {
    const t = useTranslations("Register");
    const router = useRouter();
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        name: "",
        last_name: "",
        email: "",
        password: "",
        confirmPassword: "",
        company_name: "",
        company_description: "",
        company_address: "",
        company_phone: "",
    });

    const [showPassword, setShowPassword] = useState(false);

    const registerMutation = useMutation({
        mutationFn: registerUser,
        onSuccess: (data) => {
            toast.success(t("success"));
            console.log(data);
            router.push("/login");
        },
        onError: (error: any) => {
            const mensaje = error?.response?.data?.error || t("defaultError");
            toast.error(mensaje);
            console.log(error);
        },
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (step === 1) {
            if (!formData.name || !formData.last_name || !formData.email || !formData.password || !formData.confirmPassword) {
                toast.error(t("fillAll"));
                return;
            }

            if (formData.password !== formData.confirmPassword) {
                toast.error(t("passwordsMismatch"));
                return;
            }

            setStep(2);
            return;
        }

        if (!formData.company_name.trim() || !formData.company_description.trim() || !formData.company_address.trim()) {
            toast.error(t("fillCompany"));
            return;
        }

        const dataToSend = {
            name: formData.name,
            last_name: formData.last_name,
            email: formData.email,
            password: formData.password,
            company_name: formData.company_name,
            company_description: formData.company_description,
            company_address: formData.company_address,
            company_phone: formData.company_phone,
        };

        registerMutation.mutate(dataToSend);
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full">
            {step === 1 && (
                <>
                    <section className="flex flex-col gap-4">
                        <div className="flex flex-row gap-5">
                            <div className="flex flex-col gap-1.5 w-1/2">
                                <label htmlFor="name" className="text-xs text-neutral-600">{t("name")}</label>
                                <input
                                    onChange={handleChange}
                                    id="name"
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    suppressHydrationWarning
                                    className={inputClass}
                                />
                            </div>

                            <div className="flex flex-col gap-1.5 w-1/2">
                                <label htmlFor="last_name" className="text-xs text-neutral-600">{t("lastName")}</label>
                                <input
                                    onChange={handleChange}
                                    id="last_name"
                                    type="text"
                                    name="last_name"
                                    value={formData.last_name}
                                    suppressHydrationWarning
                                    className={inputClass}
                                />
                            </div>
                        </div>

                        <div className="flex flex-col gap-1.5">
                            <label htmlFor="email" className="text-xs text-neutral-600">{t("email")}</label>
                            <input
                                onChange={handleChange}
                                id="email"
                                type="email"
                                name="email"
                                value={formData.email}
                                suppressHydrationWarning
                                className={inputClass}
                            />
                        </div>
                    </section>

                    <section className="flex flex-col gap-4">
                        <div className="flex flex-col gap-1.5">
                            <label htmlFor="password" className="text-xs text-neutral-600">{t("password")}</label>
                            <div className="relative">
                                <input
                                    onChange={handleChange}
                                    id="password"
                                    type={showPassword ? "text" : "password"}
                                    name="password"
                                    value={formData.password}
                                    suppressHydrationWarning
                                    className={inputClass}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    suppressHydrationWarning
                                    className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-neutral-400 hover:text-neutral-600 transition-colors"
                                    aria-label={showPassword ? t("hidePassword") : t("showPassword")}>
                                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                </button>
                            </div>
                        </div>

                        <div className="flex flex-col gap-1.5">
                            <label htmlFor="confirmPassword" className="text-xs text-neutral-600">{t("confirmPassword")}</label>
                            <div className="relative">
                                <input
                                    onChange={handleChange}
                                    id="confirmPassword"
                                    type={showPassword ? "text" : "password"}
                                    name="confirmPassword"
                                    value={formData.confirmPassword}
                                    suppressHydrationWarning
                                    className={inputClass}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    suppressHydrationWarning
                                    className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-neutral-400 hover:text-neutral-600 transition-colors"
                                    aria-label={showPassword ? t("hidePassword") : t("showPassword")}>
                                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                </button>
                            </div>
                        </div>
                    </section>
                </>
            )}

            {step === 2 && (
                <section className="flex flex-col gap-2">
                    <div className="flex flex-col gap-1.5">
                        <label htmlFor="company_name" className="text-xs text-neutral-600">{t("companyName")}</label>
                        <input
                            onChange={handleChange}
                            id="company_name"
                            type="text"
                            name="company_name"
                            value={formData.company_name}
                            suppressHydrationWarning
                            className={inputClass}
                        />
                    </div>

                    <div className="flex flex-col gap-1.5">
                        <label htmlFor="company_address" className="text-xs text-neutral-600">{t("companyAddress")}</label>
                        <input
                            onChange={handleChange}
                            id="company_address"
                            type="text"
                            name="company_address"
                            value={formData.company_address}
                            suppressHydrationWarning
                            className={inputClass}
                        />
                    </div>

                    <div className="flex flex-col gap-1.5">
                        <label htmlFor="company_phone" className="text-xs text-neutral-600">{t("companyPhone")}</label>
                        <input
                            onChange={handleChange}
                            id="company_phone"
                            type="text"
                            name="company_phone"
                            value={formData.company_phone}
                            suppressHydrationWarning
                            className={inputClass}
                        />
                    </div>

                    <div className="flex flex-col gap-1.5">
                        <label htmlFor="company_description" className="text-xs text-neutral-600">{t("companyDescription")}</label>
                        <textarea
                            onChange={handleChange}
                            id="company_description"
                            name="company_description"
                            value={formData.company_description}
                            rows={3}
                            maxLength={250}
                            placeholder={t("descriptionPlaceholder")}
                            suppressHydrationWarning
                            className={`${inputClass} resize-none`}
                        />
                        <span className="text-xs text-neutral-400 text-right">
                            {formData.company_description.length}/250
                        </span>
                    </div>
                </section>
            )}

            <section>
                <div className="mt-4 flex gap-3 items-center">
                    {/* Botón Volver (aparece a la izquierda cuando step === 2) */}
                    {step === 2 && (
                        <button
                            type="button"
                            onClick={() => setStep(1)}
                            disabled={registerMutation.isPending}
                            suppressHydrationWarning
                            className="flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl border border-neutral-300 bg-white text-sm font-medium text-neutral-700 hover:bg-neutral-50 hover:border-neutral-400 active:bg-neutral-100 disabled:opacity-50 transition-all duration-200 cursor-pointer shrink-0"
                        >
                            <svg
                                className="w-4 h-4 text-neutral-600"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
                                />
                            </svg>
                            <span>{t("back")}</span>
                        </button>
                    )}

                    {/* Botón principal (Continuar / Crear cuenta) */}
                    <button
                        type="submit"
                        disabled={registerMutation.isPending}
                        suppressHydrationWarning
                        className="w-full py-2.5 px-4 rounded-xl font-semibold text-white bg-cyan-600 hover:bg-cyan-500 disabled:bg-cyan-400 transition-colors ease-in-out duration-200 cursor-pointer flex items-center justify-center"
                    >
                        {registerMutation.isPending ? (
                            <LoadingIndicator />
                        ) : (
                            <span>{step === 1 ? t("continue") : t("createAccount")}</span>
                        )}
                    </button>
                </div>

                <span className="text-neutral-600 text-center text-sm mt-4 block">
                    {t("haveAccount")}{" "}
                    <Link href="/login" className="font-semibold text-cyan-600 hover:text-cyan-500 ease-in-out duration-200 transition-colors">
                        {t("login")}
                    </Link>
                </span>
            </section>
        </form>
    );
};

export default RegisterForm;