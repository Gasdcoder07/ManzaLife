import { useRouter } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { deleteBranch } from "@/features/branches/services/branch.service";
import { ModalLayout } from "@/shared/components/ModalLayout";

import { TriangleAlert } from "lucide-react";
import { Branch } from "@/features/branches/types/branch";

interface DeleteBranchModalProps {
    isOpen: boolean;
    onClose: () => void;
    branchName: string | null | undefined;
    branchId: string | number | null | undefined;
}

export const DeleteBranchModal = ({ isOpen, onClose, branchName, branchId }: DeleteBranchModalProps) => {
    const queryClient = useQueryClient();
    const router = useRouter();

    const {
        mutate: mutateDeleteBranch,
        isPending: isDeleting,
    } = useMutation({
        mutationFn: (id: string | number) => deleteBranch(id),

        onSuccess: () => {
            queryClient.setQueriesData<Branch[]>(
                { queryKey: ["branches"] },
                (oldData) =>
                    oldData?.filter(
                        (branch) => Number(branch.id) !== Number(branchId)
                    )
            );

            toast.success("Sucursal eliminada correctamente");
            onClose();
            router.push("/branches");

            queryClient.invalidateQueries({ queryKey: ["branches"] });
        },

        onError: () => {
            toast.error("Ocurrió un error al eliminar la sucursal");
        },
    });

    return (
        <ModalLayout isOpen={isOpen} onClose={onClose}>
            <div className="flex flex-col gap-4 text-sm">
                <div className="flex flex-col gap-4 items-center justify-center">
                    <div className="flex flex-col items-center justify-center size-14 bg-red-100 border border-red-200 rounded-full mx-auto">
                        <TriangleAlert size={40} className="text-red-500 -translate-y-0.5"/>
                    </div>

                    <h3 className="text-center text-xl font-semibold">Eliminar sucursal</h3>
                </div>

                <p className="text-center text-muted-foreground">
                    Esta acción no se puede deshacer. ¿Estás seguro de que quieres eliminar la sucursal <span className="font-semibold text-neutral-900">{branchName}</span>?
                </p>

                <div className="flex justify-end gap-4 mt-4">
                    <button
                        type="button"
                        onClick={onClose}
                        disabled={isDeleting}
                        className="px-4 py-2 rounded-lg border border-neutral-200 text-neutral-600 hover:bg-neutral-50 transition-colors ease-in-out duration-200 cursor-pointer"
                    >
                        Mantener surcursal
                    </button>
                    <button
                        disabled={isDeleting}
                        onClick={() => mutateDeleteBranch(Number(branchId))}
                        type="button"
                        className={`px-4 py-2 rounded-lg text-white font-medium transition-colors ease-in-out duration-200 ${
                            isDeleting
                                ? "bg-neutral-600 cursor-not-allowed"
                                : "bg-red-500 hover:bg-red-600 cursor-pointer"
                        }`}
                    >
                        {isDeleting ? "Borrando sucursal..." : "Borrar sucursal"}
                    </button>
                </div>
            </div>
        </ModalLayout>
    );
};
