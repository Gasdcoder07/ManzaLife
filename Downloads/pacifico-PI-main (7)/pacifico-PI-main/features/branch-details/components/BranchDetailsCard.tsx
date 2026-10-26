"use client";

import BranchDropdownActionButton from "@/features/branches/components/BranchDropdownActionButton";
import { getBranchById } from "@/features/branches/services/branch.service";
import { formatPhoneNumber } from "@/shared/utils/formatters";
import { useQuery } from "@tanstack/react-query";
import { House, Mail, Phone, Pin } from "lucide-react";

const BranchDetailsCard = ({ id } : { id : string | number}) => {
    const { data, isLoading } = useQuery({
        queryKey: ["getBranch", id],
        queryFn: () => getBranchById(id),
        enabled: !!id,
    });

    const branch = data?.data

    if (isLoading) return <BrachDetailsCardSkeleton/>

    return (
        <div className="flex flex-col gap-4">
            <div>
                <div className="text-neutral-600 flex gap-2 items-center">
                    <House size={16}/>

                    <span className="text-sm font-semibold">Sucursal / {branch?.name}</span>
                </div>
            </div>

            {/* Card */}
            <div className="bg-white border border-neutral-200 rounded-lg shadow-sm">
                {/* Div de la imagen */}
                <div className="relative h-40 overflow-hidden rounded-t-lg">
                    <img
                        className="block w-full h-full object-cover object-center"
                        src="https://cdn.aglty.io/scotia-bank-mexico/Attachments/NewItems/lomas-palmas-sucursal_20231018233625_0.png"
                        alt="Las brisas" />

                    <div className="absolute top-1/3 left-6 z-10 flex gap-4">
                        <h3 className="text-white font-bold text-3xl tracking-wider">{branch?.name}</h3>
                    </div>

                    <div className="absolute inset-0 bg-black/5"/>
                </div>
                {/* Div de la información */}
                <div className="relative -mt-4 rounded-lg shadow-sm bg-white flex items-strech gap-4 py-4">
                    <div className="w-1/4 flex gap-4 items-center border-r border-neutral-200 py-2 px-6">
                        <img
                            src="https://i.pinimg.com/originals/38/43/28/38432891e9e320c7ac514c8e815f2947.jpg"
                            alt="Gerente"
                            className="size-16 object-center rounded-full border border-neutral-200 shadow"
                        />

                        <div className="flex flex-col gap-0 min-w-0">
                            <p className="font-medium text-neutral-900 text-lg">
                                Juan Pérez
                            </p>
                            <span className="text-sm text-neutral-400">
                                Gerente
                            </span>
                        </div>
                    </div>

                    <div className="w-3/4 flex justify-between items-start gap-2 py-2 px-6 text-neutral-600 text-sm">
                        <div className="flex flex-col gap-2">
                            <div className="flex items-center gap-4 flex-1 min-w-0">
                                <Pin
                                    size={18}
                                    className="shrink-0"
                                />
                                <span className="truncate">
                                    {branch?.direction}
                                </span>
                            </div>
                            <div className="flex items-center gap-4">
                                <Phone
                                    size={18}
                                    className="shrink-0"
                                />
                                <span className="truncate">{formatPhoneNumber(branch?.phone)}</span>
                            </div>
                            <div className="flex items-center gap-4">
                                <Mail
                                    size={18}
                                    className="shrink-0"
                                />
                                <span className="truncate">{branch?.contact_info}</span>
                            </div>
                        </div>

                        <BranchDropdownActionButton
                            branch={branch}/>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default BranchDetailsCard;

const BrachDetailsCardSkeleton = () => {
    return (
        <div className="h-full w-full bg-neutral-200 flex flex-col flex-1 min-h-0 min-w-0 rounded-lg shadow-sm"/>
    )
};