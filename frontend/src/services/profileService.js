import api from "../api/axios";

export const getProfile = async () => {
    const res = await api.get("perfil/");
    return res.data;
}

export const updateProfile = async (data) => {
    const res = await api.patch("perfil/", data);
    return res.data;
}