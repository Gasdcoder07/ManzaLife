import api from "../api/axios";

export const getCategories = async (page = 1) => {
    const res = await api.get("categories/", {
        params: { page: page }
    });
    return res.data;
}

export const getAllCategories = async () => {
    const res = await api.get("categories/", {
        params: { pagination : 'false' }
    });
    return res.data;
}