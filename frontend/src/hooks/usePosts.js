import { useEffect, useState } from "react"
import { getPosts, getPostBySlug } from "../services/postService";

export const usePosts = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadPosts = async () => {
            const data = await getPosts();
            setPosts(data);
            setLoading(false);
        }
        
        loadPosts();
    }, []);

    return { posts, loading};
};

// Obtener post por slug
export const usePost = (slug) => {
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadPost = async () => {
            try {
                const data = await getPostBySlug(slug);
                setPost(data);
            } catch (error) {
                console.error("Error al cargar post por slug", error);
            } finally {
                setLoading(false);
            }
        };

        if (slug) loadPost()
    }, [slug]);

    return { post, loading };
}