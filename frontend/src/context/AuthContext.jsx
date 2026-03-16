import { createContext, useContext, useEffect, useState } from "react";
import api from "../api/axios"

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const getUserProfile = async (token) => {
        try {
            const res = await api.get("perfil/");
            setUser({ token: token, ...res.data })
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

    return (
        <AuthContext.Provider value={{ user, login, logout, loading }}>
            { !loading && children }
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext);