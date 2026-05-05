import { useEffect, useState } from "react"
import { getRequests } from "../services/requestService";

export const useRequests = () => {
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadRequests = async () => {
            setLoading(true);

            try {
                const data = await getRequests();
                setRequests(data);
            }
            catch (e) {
                console.log("Error al obtener requests: ", e);
            } finally {
                setLoading(false);
            }
        }
    
        loadRequests();
    }, [])

    return { requests, loading };
}