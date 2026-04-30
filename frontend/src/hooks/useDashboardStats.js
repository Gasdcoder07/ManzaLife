import { useEffect, useState } from "react"
import { getStats } from "../services/dashboardService";

export const useDashboardStats = () => {
    const [stats, setStats] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadStats = async () => {
            setLoading(true);

            try {
                const data = await getStats();
                setStats(data);
            }
            catch (e) {
                console.error("Error al cargar DashboardStats: ", e);
            }
            finally {
                setLoading(false);
            }
        }

        loadStats();
    }, []);

    return { stats, loading };
};