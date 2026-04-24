import { use, useEffect, useState } from "react"
import { getUsers } from "../services/userService";

export const useUsers = (page = 1) => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadUsers = async () => {
            setLoading(true);
            try {
                const data = await getUsers(page);
                setUsers(data);
            }
            catch (e) {
                console.error("Error: ", e);
            } finally {
                setLoading(false);
            }
        }

        loadUsers();
    }, [page]);

    return { users, loading };
}