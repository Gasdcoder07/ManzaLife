import { createContext, useContext, useEffect, useState } from "react";
import api from "../api/axios"
import { getProfile } from "../services/profileService";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const getUserProfile = async (token) => {
        try {
            const data = await getProfile();
            setUser({ token: token, ...data });
        } catch (e) {
            console.error("Error al obtener el perfil de usuario: ", e);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            getUserProfile(token);
        } else {
            setLoading(false);
        }
    }, []);

    const login = async (credenciales) => {
        try {
            const res = await api.post("login/", credenciales);
            const { access, refresh } = res.data;

            localStorage.setItem("token", access);
            localStorage.setItem("refreshToken", refresh);

            await getUserProfile(access);

            return true;
        } catch (error) {
            console.error("Error al hacer login: ", error.response?.data || error.message);
            return false;
        }
    };

    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("refreshToken");
        setUser(null);
    };

    const register = async (data) => {
        try {
            const res = await api.post("register/", data);
            return {
                success: true,
                message: res.data.message
            };
        } catch (error) {
            return {
                success: false,
                errors: error.response?.data?.errors || {
                    general: "Error del servidor"
                }
            };
        }
    }

    return (
        <AuthContext.Provider value={{ user, setUser, login, logout, loading, register }}>
            { !loading && children }
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext);