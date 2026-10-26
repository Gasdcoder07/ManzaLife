"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

interface SlideOverPanelLayoutProps {
    isOpen: boolean;
    onClose: () => void;
    title?: string;
    children: React.ReactNode;
}

export const SlideOverPanelLayout = ({ isOpen, onClose, title, children }: SlideOverPanelLayoutProps) => {
    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-50 flex justify-end pl-4">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2, ease: "easeInOut" }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/60"
                    />

                    <motion.div
                        initial={{ x: "100%" }}
                        animate={{ x: 0 }}
                        exit={{ x: "100%" }}
                        transition={{ type: "spring", damping: 30, stiffness: 300 }}
                        className={`relative z-10 w-full bg-white shadow-sm border border-neutral-200 max-w-lg flex flex-col`}
                    >
                        {
                            title && (
                                <div className="flex items-center justify-between border-b border-neutral-200 p-6">
                                    <h2 className="text-xl font-semibold text-neutral-700 tracking-wide">
                                        {title}
                                    </h2>
                                    <button
                                        onClick={onClose}
                                        className="p-1 rounded-full text-neutral-400 hover:text-neutral-700 hover:bg-neutral-100 transition-colors duration-200 ease-in-out cursor-pointer"
                                    >
                                        <X className="size-4" />
                                    </button>
                                </div>
                            )
                        }

                        <div className="flex-1 min-h-0">{children}</div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};