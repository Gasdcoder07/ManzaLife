import { motion } from "framer-motion";
import Link from "next/link";
import { Mail, MoveRight, Phone, Pin } from "lucide-react";
import BranchDropdownActionButton from "@/features/branches/components/BranchDropdownActionButton";
import { formatPhoneNumber } from "@/shared/utils/formatters";
import { createSlug } from "@/shared/utils/create.slug";

interface BranchCardProps {
    id: string | number;
    name: string;
    status: boolean;
    direction: string;
    phone: string
    email: string;
}

const BranchCard = ({ id, name, status, direction, phone, email } : BranchCardProps) => {
    const MotionLink = motion(Link);

    return (
        <div className="bg-white w-full flex gap-4 p-2 rounded-lg border border-neutral-200 shadow-sm">
            <div className="relative w-2/5 shrink-0 rounded-lg overflow-hidden shadow">
                <img
                    src="https://cdn.aglty.io/scotia-bank-mexico/Attachments/NewItems/lomas-palmas-sucursal_20231018233625_0.png"
                    alt="Branch"
                    className=" absolute inset-0 h-full w-full object-cover"
                />
            </div>

            <div className="w-3/5 min-w-0 flex flex-col gap-2">
                <div className="flex items-center justify-between gap-4 min-w-0">
                    <h3 className="text-lg font-bold text-neutral-900 tracking-wide">
                        {name}
                    </h3>

                    <StatusBadge status={status}/>
                </div>

                <div className="flex items-center gap-4 min-w-0">
                    <img
                        src="https://i.pinimg.com/originals/38/43/28/38432891e9e320c7ac514c8e815f2947.jpg"
                        alt="Gerente"
                        className="size-10 object-center rounded-full border border-neutral-200 shadow"
                    />

                    <div className="flex flex-col gap-0 min-w-0">
                        <p className="font-medium text-neutral-900 text-sm">
                            Juan Pérez
                        </p>
                        <span className="text-xs text-neutral-400">
                            Gerente
                        </span>
                    </div>
                </div>

                <div className="flex flex-col gap-2 text-xs border-b border-neutral-200 pb-2 min-w-0">
                    <div className="flex items-center gap-2 flex-1 min-w-0 text-neutral-600">
                        <Pin
                            size={12}
                            className="shrink-0"
                        />
                        <span className="line-clamp-2 wrap-break-word">
                            {direction}
                        </span>
                    </div>

                    <div className="flex items-center gap-4 flex-1 min-w-0 text-neutral-600">
                        <div className="w-1/2 flex items-center gap-2">
                            <Phone
                                size={12}
                                className="shrink-0"
                            />
                            <div className="w-full flex flex-1 min-w-0">
                                <span className="truncate">{formatPhoneNumber(phone)}</span>
                            </div>
                        </div>

                        <div className="w-1/2 flex items-center gap-2">
                            <Mail
                                size={12}
                                className="shrink-0"
                            />
                            <div className="w-full flex flex-1 min-w-0">
                                <span className="truncate">{email}</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex justify-end">
                    <MotionLink
                        href={`/branch/${id}/${encodeURIComponent(createSlug(name))}`}
                        whileHover={{ scale: 1.01 }}
                        whileTap={{ scale: 0.9 }}
                        transition={{
                            type: "spring",
                            stiffness: 300,
                            damping: 20,
                        }}
                        className="w-full sm:w-3/5 bg-cyan-400 text-white px-4 py-2 inline-flex gap-2 items-center justify-center rounded-lg text-sm font-medium"
                    >
                        <span>Ver detalles</span>
                        <MoveRight size={20} className="shrink-0" />
                    </MotionLink>
                </div>
            </div>
        </div>
    );
};

export default BranchCard;

const StatusBadge = ({ status }: { status: boolean }) => {
    let styles = status ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600';

    return (
        <span className={`${styles} px-2 py-1 rounded text-xs font-medium shadow`}>
            {status ? 'Activa' : 'Inactiva'}
        </span>
    )
}