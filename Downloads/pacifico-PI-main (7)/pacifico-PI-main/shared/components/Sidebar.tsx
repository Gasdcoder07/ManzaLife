"use client";

import { sidebarSections } from "@/shared/config/navigation";
import { ChevronsRight, LucideIcon } from "lucide-react";
import { usePathname } from "next/navigation";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations } from "next-intl";
import Link from "next/link";

const Sidebar = () => {
    const t = useTranslations("Sidebar");
    const [isOpen, setIsOpen] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);

    const pathname = usePathname();

    useEffect(() => {
        const saved = localStorage.getItem("sidebar-open");

        if (saved !== null) {
            setIsOpen(JSON.parse(saved));
        } else {
            setIsOpen(true);
        }

        setIsLoaded(true);
    }, []);

    useEffect(() => {
        if (!isLoaded) return;

        localStorage.setItem("sidebar-open", JSON.stringify(isOpen));
    }, [isOpen, isLoaded]);

    return (
        <motion.aside
            initial={false}
            animate={ { width: isOpen ? 224 : 88 } } // 256 88
            transition={ {
                duration: isLoaded ? 0.2 : 0,
                ease: "easeInOut"
            } }
            className={`p-4 flex flex-col justify-between gap-4 border-r border-neutral-300`}>
            <div className="flex-1 flex flex-col gap-8">
                {
                    sidebarSections.map((section, index) => (
                        <div
                            key={index}
                            className="flex flex-col gap-4">
                            {
                                isOpen ? (
                                    <h3 className="px-3 font-bold text-neutral-500 uppercase text-xs tracking-wider">{t(section.titleKey)}</h3>
                                ) : index > 0 ? (
                                    <div className="mb-4 border-t border-neutral-200 w-full" />
                                ) : null
                            }

                            <ul className="flex flex-col gap-4">
                                {
                                    section.items.map((item) => {
                                        const isAtCurrentPage = pathname === item.href;

                                        return (
                                            <SidebarOption
                                                key={item.id}
                                                open={isOpen}
                                                name={t(item.labelKey)}
                                                icon={item.icon}
                                                href={item.href}
                                                isSelected={isAtCurrentPage}
                                            />
                                        )
                                    })
                                }
                            </ul>
                        </div>
                    ))
                }
            </div>

            <ToggleClose open={isOpen} setIsOpen={setIsOpen}/>
        </motion.aside>
    )
};

export default Sidebar;

interface SidebarOptionProps {
    open : boolean;
    name : string;
    href : string;
    icon : LucideIcon;
    isSelected : boolean;
}

const SidebarOption = ({ open, name, href, icon : Icon, isSelected } : SidebarOptionProps) => {
    return (
        <li>
            <Link
                href={href}
                title={!open ? name : undefined}
                className={`${isSelected ? 'bg-linear-to-b from-brand-50 to-brand-100 text-brand-700' : 'text-neutral-500'} flex items-center gap-4 px-4 py-3 rounded-md duration-200 ease-in-out hover:bg-linear-to-b from-brand-50 to-brand-100 hover:text-brand-700 hover:scale-105 transition-all`}>
                <Icon className="shrink-0" size={20}/>
                <AnimatePresence initial={false}>
                    {open && (
                            <motion.span
                                initial={{ opacity: 0, width: 0, x: -50 }}
                                animate={{ opacity: 0.9, width: "auto", x: 0 }}
                                className={`text-sm ${isSelected ? 'font-bold' : 'font-medium'}`}
                            >
                                    {name}
                            </motion.span>
                    )}
                </AnimatePresence>
            </Link>
        </li>
    )
}

interface ToggleCloseProps {
    open : boolean;
    setIsOpen : Dispatch<SetStateAction<boolean>>
}

const ToggleClose = ({ open, setIsOpen } : ToggleCloseProps) => {
    const t = useTranslations("Sidebar");

    return (
        <div className="border-t border-neutral-300 pt-4">
            <button
                onClick={() => setIsOpen(!open)}
                className="w-full flex items-center px-4 py-3 gap-4 rounded-md transition-all duration-300 ease-in-out hover:bg-linear-to-b from-brand-50 to-brand-100 hover:text-brand-700 cursor-pointer">
                <ChevronsRight size={20} className={`transition-transform ${open && 'rotate-180'} shrink-0`}/>

                {
                    open && (
                        <span className="text-sm font-medium">{t("hide")}</span>
                    )
                }
            </button>
        </div>
    )
}