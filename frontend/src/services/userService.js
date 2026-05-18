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

export const banUser = async (userId, reason) => {
    const res = await api.patch(`usuarios/${userId}/ban/`, { reason });
    return res.data;
}

export const unbanUser = async (userId) => {
    const res = await api.patch(`usuarios/${userId}/unban/`);
    return res.data;
}