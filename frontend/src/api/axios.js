import axios from "axios";

const api = axios.create({
    baseURL: "http://127.0.0.1:8000/api/"
    // headers: {
    //     "Content-Type": "application/json"
    // }
});

api.interceptors.request.use((config) => {

    const token = localStorage.getItem("token");

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
});

api.interceptors.response.use(
    (response) => response,
    async (error) => {

        const originalRequest = error.config;

        if (error.response?.status === 401 && !originalRequest._retry) {

            originalRequest._retry = true;

            const refreshToken = localStorage.getItem("refreshToken");

            if (!refreshToken) {
                return Promise.reject(error);
            }

            try {

                const res = await axios.post(
                    "http://127.0.0.1:8000/api/token/refresh/",
                    { refresh: refreshToken }
                );

                const newAccessToken = res.data.access;

                localStorage.setItem("token", newAccessToken);

                originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

                return api(originalRequest);

            } catch (err) {

                localStorage.removeItem("token");
                localStorage.removeItem("refreshToken");

                return Promise.reject(err);
            }
        }

        return Promise.reject(error);
    }
);

export default api;