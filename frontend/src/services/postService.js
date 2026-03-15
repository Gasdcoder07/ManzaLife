import api from "../api/axios";

export const getPosts = async () => {
    const res = await api.get("posts/");
    return res.data;
};

export const getPostBySlug = async (slug) => {
    const res = await api.get(`posts/${slug}/`);
    return res.data;
}