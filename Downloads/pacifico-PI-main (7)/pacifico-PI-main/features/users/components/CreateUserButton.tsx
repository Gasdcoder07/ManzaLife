"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus } from 'lucide-react';
import { CreateUserModal } from './CreateUserModal';

interface CreateUserButtonProps {
    isDisabled: boolean;
    branch_id: number | string | null | undefined;
    company_id: number | string | null | undefined;
}

const CreateUserButton = ({ isDisabled, branch_id, company_id } : CreateUserButtonProps ) => {
    const [showModal, setShowModal] = useState(false);

    return (
        <>
            <motion.button
                disabled={isDisabled}
                onClick={() => setShowModal(true)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.9 }}
                transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 20,
                    duration: 0.2,
                    ease: "easeInOut",
                }}
                className="flex items-center gap-2 rounded-lg bg-cyan-400 px-4 py-2 text-sm font-medium text-white shadow-sm cursor-pointer"
            >
                <Plus size={20} className="shrink-0" />
                <span>Crear usuario</span>
            </motion.button>

            {
                showModal && (
                    <CreateUserModal
                        isOpen={showModal}
                        onClose={() => setShowModal(false)}
                        branch_id={branch_id}
                        company_id={company_id}/>
                )
            }
        </>
    );
};

export default CreateUserButton;
