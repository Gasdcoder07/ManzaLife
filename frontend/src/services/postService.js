import api from "../api/axios";

export const getPosts = async (page = 1) => {
    const res = await api.get("posts/", {
        params: { page : page }
    });
    return res.data;
};

export const getPostBySlug = async (slug) => {
    const res = await api.get(`posts/${slug}/`);
    return res.data;
}

export const postPost = async (formData) => {
    const res = await api.post("posts/", formData, {
        headers: {
            "Content-Type": "multipart/form-data"
        }
    });

    return res.data;
}

export const updatePost = async (slug, data) => {
    const res = await api.put(`posts/${slug}/`, data, {
        headers: {
            "Content-Type" : "multipart/form-data"
        }
    });
    return res.data;
}

export const getPostsByUsername = async (UserName) => {
    const res = await api.get(`posts/?author=${UserName}`);
    return res.data;
}