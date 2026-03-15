import api from "../api/axios";

export const getCategories = async () => {
    const res = await api.get("categories/");
    return res.data;
} 