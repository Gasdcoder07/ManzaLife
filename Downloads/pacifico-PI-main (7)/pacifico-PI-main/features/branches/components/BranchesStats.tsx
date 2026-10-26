"use client";

import { useQuery } from "@tanstack/react-query";
import TopBranchCard from "./TopBranchCard";
import TopBranchesCard from "./TopBranchesCard";
import { getBranches } from "../services/branch.service";

const BranchesStats = () => {
    const { data, isLoading } = useQuery({
        queryKey: ["branches"],
        queryFn: getBranches,
    });

    const branches = data ? data : [];

    return (
        <div className="flex items-stretch gap-8">
            <TopBranchCard
                isLoading={isLoading}
                branch={branches[0]}/>

            <TopBranchesCard
                isLoading={isLoading}
                branches={branches}/>
        </div>
    );
};

export default BranchesStats;
