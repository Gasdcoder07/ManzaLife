"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

interface ModalLayoutProps {
    isOpen: boolean;
    onClose: () => void;
    title?: string;
    children: React.ReactNode;
}

export const ModalLayout = ({ isOpen, onClose, title, children }: ModalLayoutProps) => {
    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/60"
                    />

                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 10 }}
                        transition={{ duration: 0.2, ease: "easeOut" }}
                        className={`relative z-10 w-full bg-white rounded-lg shadow-sm border border-neutral-200 max-w-lg p-6 flex flex-col gap-6`}
                    >
                        {
                            title && (
                                <div className="flex items-center justify-between">
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

                        <div>{children}</div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};