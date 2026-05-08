import { useEffect, useState } from "react"
import { getAllRequests, getMyRequests } from "../services/requestService";

export const useRequests = ({ all = false } = {}) => {
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadRequests = async () => {
            setLoading(true);

            try {
                let data;

                if (all) {
                    data = await getAllRequests();
                } else {
                    data = await getMyRequests();
                }

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