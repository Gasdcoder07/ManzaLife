import { apiClient } from "@/shared/lib/axios"
import { BranchProducts } from "../types/product";

export const getProducts = async () : Promise<BranchProducts[]> => {
    const response = await apiClient.get("/api/inventory");
    return response.data;
}