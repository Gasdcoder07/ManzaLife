import api from "../api/axios"

export const getRequests = async () => {
    const res = await api.get("requests/");
    return res.data;
}