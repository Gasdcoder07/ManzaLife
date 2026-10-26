"use client"

import Link from "next/link";
import { useState } from "react";
import { LoadingIndicator } from "@/shared/components/LoadingIndicator";
import { Eye, EyeOff } from "lucide-react";
import { useAuth } from "@/features/auth/hooks/useAuth";
import toast from "react-hot-toast";
import { useTranslations } from "next-intl";

const LoginForm = () => {
    const { login, isLoggingIn } = useAuth();
    const t = useTranslations("Login");

    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });

    const [showPassword, setShowPassword] = useState(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!formData.email || !formData.password) {
            toast.error(t("fillAll"));
            return;
        }

        try {
            const response = await login(formData);

            console.log(response);

            toast.success(t("success"));
        } catch (error) {
            toast.error(t("invalidCredentials"));
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-4 w-full"
        >
            <div className="flex flex-col gap-2">
                <label
                    htmlFor="email"
                    className="text-neutral-600 text-xs"
                >
                    {t("email")}
                </label>

                <input
                    onChange={handleChange}
                    id="email"
                    type="email"
                    name="email"
                    className="w-full p-3 pr-12 text-sm border border-neutral-300 rounded-xl hover:border-neutral-400 focus:border-cyan-400 focus:ring-4 focus:ring-cyan-400/5 outline-none transition-colors duration-200 ease-in-out"
                />
            </div>

            <div className="flex flex-col gap-2">
                <label
                    htmlFor="password"
                    className="text-neutral-600 text-xs"
                >
                    {t("password")}
                </label>

                <div className="relative">
                    <input
                        onChange={handleChange}
                        id="password"
                        type={showPassword ? "text" : "password"}
                        name="password"
                        className="w-full p-3 pr-12 text-sm border border-neutral-300 rounded-xl hover:border-neutral-400 focus:border-cyan-400 focus:ring-4 focus:ring-cyan-400/5 outline-none transition-colors duration-200 ease-in-out"
                    />

                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-neutral-400"
                        aria-label={showPassword ? t("hidePassword") : t("showPassword")}
                    >
                        {showPassword ? (
                            <EyeOff size={20} />
                        ) : (
                            <Eye size={20} />
                        )}
                    </button>
                </div>

                <div className="mt-2 flex justify-end">
                    <Link
                        href="/forgot-password"
                        className="font-semibold text-sm text-cyan-600 hover:text-cyan-500 transition-colors"
                    >
                        {t("forgotPassword")}
                    </Link>
                </div>
            </div>

            <div className="mt-4 flex flex-col gap-4">
                <button
                    type="submit"
                    disabled={isLoggingIn}
                    className="font-semibold text-white bg-cyan-600 hover:bg-cyan-500 disabled:opacity-50 w-full py-3 rounded-xl transition-colors ease-in-out duration-200 cursor-pointer flex items-center justify-center"
                >
                    {isLoggingIn ? (
                        <LoadingIndicator />
                    ) : (
                        <p>{t("submit")}</p>
                    )}
                </button>

                <span className="text-neutral-600 text-center text-sm">
                    {t("noAccount")}{" "}
                    <Link
                        href="/register"
                        className="font-semibold text-cyan-600 hover:text-cyan-500 transition-colors"
                    >
                        {t("registerNow")}
                    </Link>
                </span>
            </div>
        </form>
    );
};

export default LoginForm;