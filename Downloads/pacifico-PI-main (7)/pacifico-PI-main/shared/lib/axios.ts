import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";

type RetryRequestConfig = InternalAxiosRequestConfig & {
    _retry?: boolean;
};

export const apiClient = axios.create({
    headers: {
        "Content-Type": "application/json",
    },
});

let isRefreshing = false;
let failedQueue: Array<{
    resolve: (token: string) => void;
    reject: (error: any) => void;
}> = [];

const processQueue = (error: any, token: string | null = null) => {
    failedQueue.forEach((prom) => {
        if (error) {
            prom.reject(error);
        } else if (token) {
            prom.resolve(token);
        }
    });
    failedQueue = [];
};

const handleLogout = () => {
    if (typeof window !== "undefined") {
        localStorage.removeItem("token");
        localStorage.removeItem("refreshToken");
        localStorage.removeItem("userId");

        document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        document.cookie = "user_role=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

        if (!window.location.pathname.startsWith("/login")) {
            window.location.href = "/login";
        }
    }
};

apiClient.interceptors.request.use(
    (config) => {
        if (typeof window !== "undefined") {
            const token = localStorage.getItem("token");
            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }
        }
        return config;
    },
    (error) => Promise.reject(error)
);

apiClient.interceptors.response.use(
    (response) => response,
    async (error: AxiosError) => {
        const originalRequest = error.config as RetryRequestConfig;

        if (error.response?.status === 401 && originalRequest && !originalRequest._retry) {
            if (typeof window === "undefined") {
                return Promise.reject(error);
            }

            if (isRefreshing) {
                return new Promise((resolve, reject) => {
                    failedQueue.push({ resolve, reject });
                })
                    .then((token) => {
                        originalRequest.headers.Authorization = `Bearer ${token}`;
                        return apiClient(originalRequest);
                    })
                    .catch((err) => Promise.reject(err));
            }

            originalRequest._retry = true;
            isRefreshing = true;

            const refreshToken = localStorage.getItem("refreshToken");

            if (!refreshToken) {
                isRefreshing = false;
                handleLogout();
                return Promise.reject(error);
            }

            try {
                const res = await axios.post("/api/auth/refresh", {
                    refreshToken,
                });

                const newAccessToken = res.data.access_token;

                localStorage.setItem("token", newAccessToken);
                
                apiClient.defaults.headers.common["Authorization"] = `Bearer ${newAccessToken}`;
                originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

                processQueue(null, newAccessToken);
                return apiClient(originalRequest);
            } catch (refreshError) {
                processQueue(refreshError, null);
                handleLogout();
                return Promise.reject(refreshError);
            } finally {
                isRefreshing = false;
            }
        }

        return Promise.reject(error);
    }
);