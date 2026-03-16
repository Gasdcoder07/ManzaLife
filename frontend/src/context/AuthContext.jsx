import { createContext, useContext, useEffect, useState } from "react";
import api from "../api/axios"

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) setUser(token);
        setLoading(false);
    }, []);

    const login = async (credenciales) => {
        try {
            const res = await api.post("login/", credenciales);
            const { access, refresh } = res.data;

            localStorage.setItem("token", access);
            localStorage.setItem("refreshToken", refresh);

            setUser({ token: access });

            return true
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