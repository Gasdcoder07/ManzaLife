"use client";

import ThemeToggle from "@/shared/components/ThemeToggle";
import { useAuth } from "@/features/auth/hooks/useAuth";
import ProfilePfp from "@/shared/components/ProfilePfp";
import BusinessContext from "./BusinessContext";
import { LanguageSwitcher } from "@/i18n/components/LanguageSwitcher";
import { useTranslations } from "next-intl";

const Navbar = () => {
    const t = useTranslations("Navbar");
    const { user, loading } = useAuth();
    const fullName = user ? `${user.name} ${user.last_name}` : t("loading");

    return (
        <nav className="bg-white border-b border-neutral-300 dark:bg-slate-900 dark:border-slate-700">
            <div className="mx-auto flex justify-between items-center py-3 px-4">
                <BusinessContext
                    role={user?.rol_id}
                    companyImage="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSy45ZDId1LatgF6AFZ32E9FTi90TIyVy7Ag7Y8J9eOQg&s=10"
                    contextName={user?.context_name}
                    loading={loading}
                />

                <div className="flex justify-center items-center gap-4">
                    <ThemeToggle />
                    <LanguageSwitcher />

                    <ProfilePfp
                        name={fullName || t("user")}
                        role={user?.rol_id || null}
                        avatar={user ? user.foto_url : ""}
                    />
                </div>
            </div>
        </nav>
    );
};

export default Navbar;