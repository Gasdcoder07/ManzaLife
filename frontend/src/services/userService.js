import api from "../api/axios";

export const getUsers = async (page = 1) => {
    const res = await api.get("usuarios/", {
        params: { page : page }
    });
    return res.data;
};

export const getUserByUsername = async (username) => {
    const res = await api.get(`usuarios/${username}/`);
    return res.data;
}