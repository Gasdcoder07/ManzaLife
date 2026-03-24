import api from "../api/axios";

export const postComment = async (data) => {
    const res = await api.post("comments/", data);
    return res.data;
}