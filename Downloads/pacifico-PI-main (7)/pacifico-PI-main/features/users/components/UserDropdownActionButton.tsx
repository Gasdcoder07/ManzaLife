import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Trash, Edit, Ellipsis } from "lucide-react";
import EditUserPanel from "./EditUserPanel";
import { DeleteUserModal } from "./DeleteUserModal";
import { User } from "../types/user";
import { BranchId } from "@/features/branches/types/branch";

interface UserDropdownActionButtonProps {
    user: User
    isMe: boolean;
    branchId: BranchId
}

const UserDropdownActionButton = ({ user, isMe, branchId } : UserDropdownActionButtonProps) => {
    const containerRef = useRef<HTMLDivElement>(null);

    const [open, setOpen] = useState(false);
    const [showEditPanel, setShowEditPanel] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
        if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
            setOpen(false);
        }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const hoverAnimation = !isMe ? { scaleX: 1.1, scaleY: 1.1 } : undefined
    const tapAnimation = !isMe ? { scaleX: 0.9, scaleY: 1.1, borderRadius: "50%" } : undefined;

    return (
        <div className="relative shrink-0 flex justify-center items-center gap-2" ref={containerRef}>
            <motion.button
                aria-haspopup="true"
                aria-expanded={open}
                whileHover={hoverAnimation}
                whileTap={tapAnimation}
                transition={!isMe ? { type: "spring", bounce: 0.6, duration: 0.8 } : undefined}
                disabled={isMe}
                className={`bg-linear-to-b from-brand-50 to-brand-100 border border-brand-100 text-brand-700 p-1 rounded-lg ${isMe ? 'cursor-not-allowed' : 'cursor-pointer'}`}
                onClick={() => setOpen(!open)}>
                <Ellipsis size={20}/>
            </motion.button>

            {
                open && (
                    <div
                        className="absolute right-2 -top-12 -translate-x-1/5 z-10 flex flex-col items-stretch gap-2 rounded-2xl border border-neutral-200 bg-white shadow-lg p-2 w-44 origin-top-right">
                        <button
                            onClick={() => {
                                setShowEditPanel(true);
                                setOpen(false);
                            }}
                            className="w-full text-neutral-900 flex items-center gap-4 py-2 px-3 rounded-xl transition-colors duration-200 ease-in-out cursor-pointer hover:bg-gray-100">
                            <Edit size={18}/>
                            <span>Editar</span>
                        </button>
                        <button
                            onClick={() => {
                                setShowDeleteModal(true);
                                setOpen(false);
                            }}
                            className="w-full text-neutral-900 flex items-center gap-4 py-2 px-3 rounded-xl transition-colors duration-200 ease-in-out cursor-pointer hover:bg-red-50 hover:text-red-600">
                            <Trash size={18}/>
                            <span>Eliminar</span>
                        </button>
                    </div>
                )
            }

            {
                showEditPanel && (
                    <EditUserPanel isOpen={showEditPanel} onClose={() => setShowEditPanel(false)} user={user}/>
                )
            }

            {
                showDeleteModal && (
                    <DeleteUserModal isOpen={showDeleteModal} onClose={() => setShowDeleteModal(false)} userName={user.name} userLastName={user.last_name} userId={user.id} branchId={branchId}/>
                )
            }
        </div>
    );
};

export default UserDropdownActionButton;
