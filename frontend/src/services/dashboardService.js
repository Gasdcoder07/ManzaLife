import api from "../api/axios";

export const getStats = async () => {
    const res = await api.get("dashboard/stats/")
    return res.data
}