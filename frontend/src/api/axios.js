import axios from "axios";

const API_URL = "https://manzalife.onrender.com/api" 
// const API_URL = "http://localhost:8000/api/" 

const api = axios.create({
    baseURL: API_URL
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
                    `${API_URL}/token/refresh/`,
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
