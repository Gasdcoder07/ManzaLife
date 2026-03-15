import { useEffect, useState } from "react"
import { getCategories } from "../services/categoryService";

export const useCategories = () => {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        getCategories().then(setCategories).catch(console.error);
    }, []);

    return categories;
};