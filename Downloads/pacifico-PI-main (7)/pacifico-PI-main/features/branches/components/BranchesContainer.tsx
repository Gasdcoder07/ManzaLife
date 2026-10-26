"use client";

import { useQuery } from "@tanstack/react-query";
import { getBranches } from "../services/branch.service";
import { Building2, LucideIcon, MapPin, UserCheck, Warehouse } from "lucide-react";
import BranchCard from "./BranchCard";
import CreateBranchButton from "./CreateBranchButton";

const BranchesContainer = () => {
    const { data, isLoading } = useQuery({
        queryKey: ["branches"],
        queryFn: getBranches,
    });

    const branches = data ? data : [];

    const renderContent = (): React.ReactNode => {
        if (isLoading) {
            return (
                <>
                    {Array.from({ length: 2 }).map((_, index) => (
                        <BranchCardSkeleton key={index} />
                    ))}
                </>
            );
        }

        if (!branches) {
            return <>{<BranchesEmptyState/>}</>;
        }

        return (
            <>
                {branches.map((branch) => (
                    <BranchCard
                        key={branch.id}
                        id={branch.id}
                        name={branch.name}
                        status={branch.status}
                        direction={branch.direction}
                        phone={branch.phone}
                        email={branch.contact_info}
                    />
                ))}
            </>
        );
    };

    return (
        <div className="w-full flex flex-col gap-8">
            <div className="flex items-center justify-between gap-4">
                <h3 className="text-2xl font-semibold">Mis sucursales</h3>

                <CreateBranchButton />
            </div>

            <div className="w-full grid lg:grid-cols-2 gap-4">
                {renderContent()}
            </div>
        </div>
    );
};

export default BranchesContainer;

const BranchCardSkeleton = () => {
    return <div className="w-full rounded-lg bg-neutral-200 shadow-sm h-56" />;
};

const BranchesEmptyState = () => {
    return (
        <div className="w-full col-span-full flex flex-col bg-white border border-neutral-200 rounded-lg gap-6 p-4 shadow-sm">
            <div className="flex flex-col items-center justify-center">
                <div className="p-4 bg-brand-50 text-brand-600 border border-brand-200 rounded-full mb-2">
                    <Warehouse size={28} />
                </div>
                <h3 className="text-xl font-semibold tracking-wide mb-1">Todavía no hay sucursales para mostrar</h3>
                <p className="text-neutral-600 text-sm">Registra tu primer sucursal para poder ver su información y métricas clave.</p>
            </div>
            <div className="flex items-start justify-center gap-2">
                <BranchesEmptyStateStep
                    step={1}
                    icon={Building2}
                    title="Datos generales"
                    description="Nombre y configuración básica"/>

                <BranchesEmptyStateStep
                    step={2}
                    icon={MapPin}
                    title="Dirección y contacto"
                    description="Dirección, telefono y contacto de la sucursal"/>

                <BranchesEmptyStateStep
                    step={3}
                    icon={UserCheck}
                    title="Asignar gerente"
                    description="Selecciona a un gerente y a su equipo"/>
            </div>
        </div>
    )
}

interface BranchesEmptyStateStepProps {
    step: number;
    icon: LucideIcon;
    title: string;
    description: string;
}

const BranchesEmptyStateStep = ({ step, icon : Icon, title, description } : BranchesEmptyStateStepProps) => {
    return (
        <div className="flex items-start gap-4 border border-neutral-200 rounded-lg border-dashed p-4">
            <div className="flex items-start gap-3">
                <div className="p-2 bg-brand-50 text-brand-600 border border-brand-200 rounded-full">
                    <Icon size={22}/>
                </div>
                <div className="flex items-center justify-center size-7 bg-brand-100 text-brand-600 rounded-full">
                    <span className="font-bold text-sm">{step}</span>
                </div>
            </div>
            <div className="flex flex-col items-start gap-1">
                <h5 className="text-sm font-semibold">{title}</h5>
                <p className="text-sm text-neutral-600 max-w-50">{description}.</p>
            </div>
        </div>
    )
}