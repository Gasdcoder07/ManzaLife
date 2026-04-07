import api from "../api/axios";

export const getUsers = async () => {
    const res = await api.get("usuarios/");
    return res.data;
};

export const getUserByUsername = async (username) => {
    const res = await api.get(`usuarios/${username}/`);
    return res.data;
}