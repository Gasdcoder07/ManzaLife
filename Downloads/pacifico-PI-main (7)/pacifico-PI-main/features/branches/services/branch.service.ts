import { apiClient } from "@/shared/lib/axios";
import { Branch, BranchResponse, DeleteBranchResponse } from "../types/branch";

export interface CreateBranchPayload {
    name: string;
    direction: string;
    phone?: string;
    contact_info?: string;
}

export interface Branch {
    id: number
    company_id: number
    admin_id: number
    name: string
    direction: string
    phone: string
    contact_info: string
    status: boolean
    created_at: string
    updated_at: string
    gerentes: []
}

export const getBranches = async (): Promise<Branch[]> => {
    const response = await apiClient.get("/api/sucursales")
    return response.data.data 
}

export const getBranchById = async (id : string | number) : Promise<BranchResponse> => {
    const response = await apiClient.get(`/api/sucursales/${id}`);
    return response.data;
}

export const createBranch = async (data: CreateBranchPayload): Promise<Branch> => {
    const response = await apiClient.post("/api/sucursales", data);
    return response.data.data;
}

export const deleteBranch = async (id: string | number) : Promise<DeleteBranchResponse> => {
    const response = await apiClient.delete(`/api/sucursales/${id}`)
    return response.data;
}