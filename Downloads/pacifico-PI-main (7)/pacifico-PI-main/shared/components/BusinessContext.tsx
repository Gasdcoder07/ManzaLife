"use client";

import { useTranslations } from "next-intl";

interface BusinessContextProps {
    role?: number | null;
    companyImage: string;
    contextName?: string | null;
    loading?: boolean;
}

const BusinessContext = ({ role, companyImage, contextName, loading = false }: BusinessContextProps) => {
    const t = useTranslations("BusinessContext");
    const isAdmin = role === 1;
    const title = isAdmin ? t("company") : t("branch");

    return (
        <div className="flex items-center gap-4 min-w-0">
            <div className="overflow-hidden rounded-md border border-neutral-200 shadow-sm h-10 w-14 shrink-0">
                <img
                    src={companyImage}
                    alt={isAdmin ? t("companyAlt") : t("userCompanyAlt")}
                    className="h-full w-full object-contain object-center"
                />
            </div>

            <div className="flex flex-col min-w-0">
                {
                    !loading && (
                        <p className="text-neutral-500 text-xs font-medium whitespace-nowrap">
                            {title}
                        </p>
                    )
                }

                <p className="text-sm font-semibold truncate">
                    {loading ? t("loading") : contextName}
                </p>
            </div>
        </div>
    );
};

export default BusinessContext;