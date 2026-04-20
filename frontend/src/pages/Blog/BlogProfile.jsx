import { useAuth } from "../../context/AuthContext";
import { data, useParams } from "react-router";
import { useEffect, useState } from "react";
import { getUserByUsername } from "../../services/userService";
import EditProfileModal from "../../components/Modals/EditProfileModal";
import ImageProfileModal from "../../components/Modals/ImageProfileModal";
import BlogProfileSkeleton from "../../components/Blog/BlogProfile/BlogProfileSkeleton";
import BlogProfileError from "../../components/Blog/BlogProfile/BlogProfileError";
import { MdOutlineAddPhotoAlternate } from "react-icons/md";
import Banner from "../../../imgs/LoginResources/Login_bg.png";
import DefaultAvatar from "../../../imgs/DefaultAvatar.webp";
import BlogProfilePost from "../../components/Blog/BlogProfile/BlogProfilePost";
import { getPostsByUsername } from "../../services/postService";
import { useLanguage } from "../../context/LanguageContext";

const BlogProfile = () => {
    const { username } = useParams()
    const { idioma } = useLanguage();
    const { user: currentUser } = useAuth();
    const Authorized = currentUser?.username === username;

    const [showModal, setShowModal] = useState(false);
    const [showImageModal, setShowImageModal] = useState(false);

    const [profileData, setProfileData] = useState(null);
    const [loading, setLoading] = useState(true);

    const [posts, setPosts] = useState([]);
    const [loadingPosts, setLoadingPosts] = useState(true);
    
    useEffect(() => {
        const fetchProfileData = async () => {
            setLoading(true);
            
            if (Authorized) {
                setProfileData(currentUser);
                setLoading(false);
            } else {
                try {
                    const data = await getUserByUsername(username);
                    setProfileData(data);
                } catch (e) {
                    console.error("Error al cargar el perfil: ", e);
                    setProfileData(null);
                } finally {
                    setLoading(false);
                }
            }
        }
        
        fetchProfileData();
        
    }, [username, currentUser, Authorized]);
    
    useEffect(() => {
        const fetchPosts = async () => {
            setLoadingPosts(true);

            try {
                const data = await getPostsByUsername(username);
                setPosts(data);
                setLoadingPosts(false);
            } catch (e) {
                console.error(e);
            } finally {
                setLoadingPosts(false);
            }
        };

        if (username) {
            setPosts([]);
            fetchPosts();
        }

    }, [username]);

    if (loading) {
        return <BlogProfileSkeleton/>
    }
    
    if (!profileData) {
        return <BlogProfileError/>
    }

    // console.log(username)
    // console.log(posts);

  return (
    <div className="py-4 flex flex-col gap-4">
        <div className="border border-neutral-700 rounded-xl overflow-hidden">
            <div className="relative h-56 sm:h-72">
                <img
                    className="w-full h-full object-cover"
                    src={Banner}
                    alt="Banner" 
                />

                {
                    Authorized && (
                        <button className="absolute bottom-4 right-4 bg-white/20 p-2 rounded-full hover:bg-white/30 cursor-pointer transition-colors duration-200 ease-in-out">
                            <MdOutlineAddPhotoAlternate className="text-white"/>
                        </button>
                    )
                }
            </div>

            <div className="px-6 pb-6 space-y-4">
                <div className="flex justify-center sm:justify-between -mt-20">
                    <div className="relative size-32 sm:size-40">
                        <img
                            className="border-4 border-zinc-950 rounded-full size-32 sm:size-40 object-cover"
                            src={profileData?.avatar || DefaultAvatar}
                            alt={profileData.username}
                        />
                        {
                            Authorized && (
                                <button
                                    onClick={() => setShowImageModal(true)}
                                    className="absolute bottom-0 right-0 -translate-x-full bg-white/10 p-2 rounded-full cursor-pointer hover:bg-white/20 transition-colors duration-200 ease-in-out">
                                    <MdOutlineAddPhotoAlternate/>
                                </button>
                            )
                        }
                    </div>

                </div>

                <div className="flex flex-col gap-4">
                    <div className="space-y-4">
                        <div className="space-y-1">
                            <h3 className="italic tracking-wide font-light">{profileData.first_name} {profileData.last_name}</h3>
                            <h2 className="text-2xl font-semibold tracking-widest">@{profileData.username}</h2>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4 justify-between items-start">
                            <p className="text-neutral-400 whitespace-pre-line">{profileData.bio}</p>
                            {
                                Authorized && (
                                    <button
                                        onClick={() => setShowModal(true)}
                                        className="shrink-0 border border-neutral-700 rounded-sm w-full sm:w-fit px-4 py-2 hover:-translate-y-1 transition-all duration-200 ease-in-out cursor-pointer">
                                        {idioma === "en" ? "Edit profile" : "Editar perfil"}
                                    </button>
                                )
                            }
                        </div>
                    </div>
                    
                    <p className="text-neutral-300"><span className="font-bold text-white">{posts.length}</span> {idioma === "en" ? "Posts" : "Publicaciones"}</p>
                </div>
            </div>
        </div>

        <div className="border border-neutral-700 rounded-xl px-6 py-4 flex flex-col gap-4">
            <p className="font-semibold">
                {idioma === "en" ? "Posts" : "Publicaciones"}
            </p>

            <div className="flex flex-col gap-4">
                {
                    posts.map((post, index) => {
                        return (
                            <BlogProfilePost
                                key={index}
                                IsAuthorized={Authorized}
                                PostSlug={post.slug}
                                PostImage={post.image}
                                PostName={post.title}
                                PostCreationDate={post.created_at}/>
                        )
                    })
                }

                {
                    loadingPosts && (
                        <p className="text-neutral-300 italic">Cargando publicaciones...</p>
                    )
                }

                {
                    !loadingPosts && posts.length === 0 && (
                        <p className="text-neutral-300 italic">Este usuario no tiene publicaciones disponibles!</p>
                    )
                }
            </div>

        </div>

        {
            showModal && 
                <EditProfileModal
                    setShowModal={setShowModal}/>
        }
        {
            showImageModal &&
                <ImageProfileModal
                    setShowImageModal={setShowImageModal}/>
        }
    </div>
  );
};

export default BlogProfile;
