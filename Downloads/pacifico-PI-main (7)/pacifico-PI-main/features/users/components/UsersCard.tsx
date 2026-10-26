import { Mail, ShieldCheck } from "lucide-react";

import { User } from "../types/user";
import { BranchId } from "@/features/branches/types/branch";

import UserDropdownActionButton from "./UserDropdownActionButton";

const colors = [
    "bg-rose-100 border-rose-200 text-rose-700",
    "bg-orange-100 border-orange-200 text-orange-700",
    "bg-amber-100 border-amber-200 text-amber-700",
    "bg-emerald-100 border-emerald-200 text-emerald-700",
    "bg-teal-100 border-teal-200 text-teal-700",
    "bg-sky-100 border-sky-200 text-sky-700",
    "bg-indigo-100 border-indigo-200 text-indigo-700",
    "bg-violet-100 border-violet-200 text-violet-700",
];

const UsersCard = ({ user, isMe, branchId } : { user: User, isMe: boolean, branchId: BranchId }) => {
    const initials = `${user.name.charAt(0)}${user.last_name.charAt(0)}`;

    const index = user.name
        .split("")
        .reduce((sum, char) => sum + char.charCodeAt(0), 0) % colors.length;

    return (
        <div className="bg-white border border-neutral-200 w-full rounded-lg shadow-sm px-8 py-4 flex items-center justify-between gap-4">
            <div className="flex items-center gap-4 min-w-3/10">
                <div className={`${colors[index]} border rounded-full size-12 flex items-center justify-center  `}>
                    <p>{initials}</p>
                </div>
                <p className="font-medium text-[15px]">{user.name} {user.last_name}</p>

                {
                    isMe && (
                        <div className="bg-[#F4F7F9] px-2 py-1 rounded">
                            <span className="text-xs font-medium"> (Tú)</span>
                        </div>
                    )
                }
            </div>
            <div className="w-full flex items-center justify-between flex-1 min-w-0 gap-2">
                <div className="flex flex-col gap-2 flex-1 min-w-0">
                    <div>
                        <RolSpan rol_id={user.rol_id} />
                    </div>
                    <div className="flex items-center gap-2 flex-1 min-w-0">
                        <Mail size={14} className="text-neutral-500 shrink-0 translate-y-[0.5px]" />
                        <span className="text-xs text-neutral-500 truncate">{user.email}</span>
                    </div>
                </div>

                <UserDropdownActionButton user={user} isMe={isMe} branchId={branchId}/>
            </div>
        </div>
    );
};

export default UsersCard;

interface RolSpanProps {
    rol_id: number | string;
}

export const RolSpan = ({ rol_id } : RolSpanProps) => {
    let label = "";
    let spanStyles = "";

    if (rol_id === 1) {
        label = 'Administrador';
        spanStyles = "bg-[#EDE9FE] text-[#5B21B6] border-purple-200";
    } else if (rol_id === 2) {
        label = 'Gerente';
        spanStyles = "bg-[#DBEAFE] text-[#1E40AF] border-blue-200";
    } else {
        label = 'Cajero';
        spanStyles = "bg-[#CCFBF1] text-[#0F766E] border-teal-200";
    }

    return (
        <span className={`shrink-0 inline-flex items-center gap-2 px-4 py-1 rounded-full border text-xs ${spanStyles}`}>
            <ShieldCheck size={14} className="shrink-0" />
            {label}
        </span>
    )
}