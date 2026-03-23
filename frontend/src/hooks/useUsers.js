import { use, useEffect, useState } from "react"
import { getUsers } from "../services/userService";

export const useUsers = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadUsers = async () => {
            const data = await getUsers();
            setUsers(data);
            setLoading(false);
        }

        loadUsers();
    }, []);

    return { users, loading };
}