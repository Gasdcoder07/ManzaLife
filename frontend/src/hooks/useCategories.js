import { useEffect, useState } from "react"
import { getCategories } from "../services/categoryService";

export const useCategories = () => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadCategories = async () => {
            const data = await getCategories();
            setCategories(data);
            setLoading(false);
        }
        
        loadCategories();
    }, []);

    return {categories, loading};
};