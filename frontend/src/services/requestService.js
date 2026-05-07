import api from "../api/axios"

export const getRequests = async () => {
    const res = await api.get("requests/");
    return res.data;
}

export const postRequest = async (data) => {
    const res = await api.post("requests/", data);
    return res.data;
}