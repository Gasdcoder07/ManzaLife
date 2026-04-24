import { useEffect, useState } from "react"
import { getCategories } from "../services/categoryService";

export const useCategories = (page = 1) => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadCategories = async () => {
            setLoading(true);

            try {
                const data = await getCategories(page);
                setCategories(data);
            } catch (e) {
                console.error("Error: ", e);
            }
            finally {
                setLoading(false);
            }
        }
        
        loadCategories();

    }, [page]);

    return {categories, loading};
};