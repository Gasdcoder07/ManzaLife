import api from "../api/axios"

export const getMyRequests = async () => {
    const res = await api.get("requests/");
    return res.data;
}

export const getAllRequests = async () => {
    const res = await api.get("requests/all_requests/");
    return res.data;
}

export const postRequest = async (data) => {
    const res = await api.post("requests/", data);
    return res.data;
}

export const updateRequest = async (idRequest, data) => {
    const res = await api.patch(`requests/${idRequest}/`, data);
    return res.data;
}

export const deleteRequest = async (idRequest) => {
    const res = await api.delete(`requests/${idRequest}/`);
    return res.data;
}