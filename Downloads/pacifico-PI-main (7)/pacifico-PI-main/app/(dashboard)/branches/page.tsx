import BranchesStats from "@/features/branches/components/BranchesStats";
import BranchesContainer from "@/features/branches/components/BranchesContainer";
import { Metadata } from "next";

export const metadata : Metadata = {
    title : "Pacífico - Sucursales",
    description : "Gestiona tus sucursales"
}

export default function Page() {
    return (
        <div className="p-4 sm:p-6 lg:p-8 flex flex-col gap-4 sm:gap-6 lg:gap-8">
            <BranchesStats/>

            <BranchesContainer/>
        </div>
    );
}
