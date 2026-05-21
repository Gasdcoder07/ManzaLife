import { useAuth } from "../../context/AuthContext";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { getPostBySlug } from "../../services/postService";
import PostForm from "../PostForm/PostForm";
import PostFormSkeleton from "../../components/Blog/PostForm/PostFormSkeleton";
import PostFormError from "../../components/Blog/PostForm/PostFormError";
import { useLanguage } from "../../context/LanguageContext.jsx";

const EditPostPage = () => {
    const { user } = useAuth();
    const { slug } = useParams();
    const [post, setPost] = useState(null);
    const navigate = useNavigate();

    const { idioma } = useLanguage();
    const isEnglish = idioma === "en";

    // console.log(user)
    console.log(post)
    const isAuthor = user?.username === post?.author?.username;
    const isAdmin = user?.isAdmin || false;

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const data = await getPostBySlug(slug);
                setPost(data);
            } catch (e) {
                console.error("Error al obtener Post por Id: ", e);
            }
        }

        fetchPost();
    }, [slug]);

    useEffect(() => {
        if (!user) {
            navigate("/auth/login");
        }

    }, [user]);

    if (!post) return <PostFormSkeleton/>
    if (!user) return null;
    if (!isAuthor && !isAdmin) return <PostFormError isEnglish={isEnglish}/>

  return <PostForm isEnglish={isEnglish} mode={"edit"} PostData={post}/>
};

export default EditPostPage;
