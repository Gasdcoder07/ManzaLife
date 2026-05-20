import { useAuth } from "../../context/AuthContext";
import { data, useParams } from "react-router";
import { useEffect, useState } from "react";
import { getUserByUsername } from "../../services/userService";
import EditProfileModal from "../../components/Modals/EditProfileModal";
import ImageProfileModal from "../../components/Modals/ImageProfileModal";
import BlogProfileSkeleton from "../../components/Blog/BlogProfile/BlogProfileSkeleton";
import BlogProfileError from "../../components/Blog/BlogProfile/BlogProfileError";
import { MdOutlineAddPhotoAlternate, MdBlock, MdLockOpen, MdAdminPanelSettings } from "react-icons/md";
import BlogProfilePost from "../../components/Blog/BlogProfile/BlogProfilePost";
import { deletePost, getPostsByUsername } from "../../services/postService";
import { useLanguage } from "../../context/LanguageContext";
import DefaultBanner from "../../../imgs/LoginResources/Login_bg.png";
import BanUserModal from "../../components/Modals/BanUserModal";
import DefaultAvatar from "../../../imgs/DefaultAvatar.webp";
import DeletePostModal from "../../components/Modals/DeletePostModal";
import BannerProfileModal from "../../components/Modals/BannerProfileModal";
import AdminUserModal from "../../components/Modals/AdminUserModal";

const BlogProfile = () => {
    const { username } = useParams()
    const { idioma } = useLanguage();
    const isEnglish = idioma === "en";

    const { user: currentUser, setUser: setCurrentUser } = useAuth();

    const Authorized = currentUser?.username === username;
    const isAdmin = currentUser?.isAdmin && currentUser.user_type === "admin";

    const [showModal, setShowModal] = useState(false);
    const [showImageModal, setShowImageModal] = useState(false);
    const [showBannerModal, setShowBannerModal] = useState(false);
    const [showBanModal, setShowBanModal] = useState(false);
    const [showAdminModal, setShowAdminModal] = useState(false);

    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [deleteSelectedPostName, setDeleteSelectedPostName] = useState(null);
    const [deleteSelectedPost, setDeleteSelectedPost] = useState(null);

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
                setPosts(data.results);
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

    const handleDelete = (slug) => {
        setDeleteSelectedPost(slug);
        setShowDeleteModal(true);
    }

    const handleDeleteConfirm = async (slug) => {
        await deletePost(slug);
        setPosts(prev => prev.filter(p => p.slug !== slug));
    }

    // console.log(username)
    // console.log("currentUser:", currentUser);
    // console.log("user_type:", currentUser?.user_type);
    console.log("profileData:", profileData);
    // console.log("Authorized:", Authorized);

  return (
    <div className="py-4 flex flex-col gap-4">
        <div className="bg-[#fcfcfc] dark:bg-[#0d0d0f] border border-neutral-300 dark:border-neutral-700 rounded-xl overflow-hidden shadow-xl">
            <div className="relative h-56 sm:h-72">
                <img
                    className="w-full h-full object-cover"
                    src={profileData?.banner || DefaultBanner}
                    alt="Banner" 
                />

                {
                    Authorized && (
                        <button onClick={() => setShowBannerModal(true)} className="absolute bottom-4 right-4 bg-white/20 p-2 rounded-full hover:bg-white/30 cursor-pointer transition-colors duration-200 ease-in-out">
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
                                    className="absolute bottom-0 right-0 -translate-x-full bg-black/10 dark:bg-white/10 p-2 rounded-full cursor-pointer hover:bg-black/20 dark:hover:bg-white/20 transition-colors duration-200 ease-in-out">
                                    <MdOutlineAddPhotoAlternate className="text-white"/>
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
                            {
                                profileData.is_banned && (
                                    <p className="text-red-500 dark:text-red-600 font-medium">
                                        {isEnglish ? "This user is banned." : "Este usuario está baneado."}
                                    </p>
                                )
                            }
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4 justify-between items-start">
                            <p className="text-neutral-500 dark:text-neutral-400 whitespace-pre-line">{profileData.bio}</p>
                            {
                                isAdmin && !Authorized && (
                                    <div
                                        className="shrink-0 flex items-center justify-center gap-4">
                                            <button
                                                onClick={() => setShowBanModal(true)}
                                                className={`${profileData.is_banned ? 'text-green-500 hover:text-green-600 dark:text-green-600 dark:hover:text-green-700' : 'text-red-500 hover:text-red-600 dark:text-red-600 dark:hover:text-red-700'} hover:-translate-y-0.5 cursor-pointer transition-all duration-200 ease-in-out`}>
                                                    {
                                                        profileData.is_banned ? <MdLockOpen size={24}/> : <MdBlock size={24}/>
                                                    }
                                            </button>

                                            {
                                                !profileData.is_banned && (
                                                    <button
                                                        onClick={() => setShowAdminModal(true)}
                                                        className={`${profileData.isAdmin ? 'text-orange-500 hover:text-orange-600 dark:text-orange-600 dark:hover:text-orange-700' : 'text-green-500 hover:text-green-600 dark:text-green-600 dark:hover:text-green-700'} hover:-translate-y-0.5 cursor-pointer transition-all duration-200 ease-in-out`}>
                                                            <MdAdminPanelSettings size={24}/>
                                                    </button>
                                                )
                                            }

                                    </div>
                                )
                            }

                            {
                                Authorized && (
                                    <button
                                        onClick={() => setShowModal(true)}
                                        className="shrink-0 border border-neutral-700 rounded-sm w-full sm:w-fit px-4 py-2 hover:-translate-y-1 transition-all duration-200 ease-in-out cursor-pointer">
                                        {isEnglish ? "Edit profile" : "Editar perfil"}
                                    </button>
                                )
                            }
                        </div>
                    </div>
                    
                    <p className="text-neutral-400 dark:text-neutral-300"><span className="font-bold text-zinc-950 dark:text-white">{posts.length}</span> {isEnglish ? "Posts" : "Publicaciones"}</p>
                </div>
            </div>
        </div>

        <div className="bg-[#fcfcfc] dark:bg-[#0d0d0f] border border-neutral-300 dark:border-neutral-700 rounded-xl px-6 py-4 flex flex-col gap-4 shadow-xl">
            <p className="font-semibold">
                {isEnglish ? "Posts" : "Publicaciones"}
            </p>

            <div className="flex flex-col gap-4">
                {
                    posts.map((post, index) => {
                        return (
                            <BlogProfilePost
                                key={index}
                                idioma={idioma}
                                IsAuthorized={Authorized}
                                PostSlug={post.slug}
                                PostImage={post.image}
                                PostName={post.title}
                                PostStatus={post.status}
                                PostCreationDate={post.created_at}
                                handleDelete={handleDelete}
                                setPostName={setDeleteSelectedPostName}/>
                        )
                    })
                }

                {
                    loadingPosts && (
                        <p className="text-neutral-300 italic">
                            {isEnglish ? "Loading posts..." : "Cargando publicaciones..."}
                        </p>
                    )
                }

                {
                    !loadingPosts && posts.length === 0 && (
                        <p className="text-neutral-300 italic">
                            {isEnglish ? "This user has no posts available." : "Este usuario no tiene publicaciones disponibles."}
                        </p>
                    )
                }

                {
                    showBanModal && (
                        <BanUserModal
                            setProfileData={setProfileData}
                            setShowBanModal={setShowBanModal}
                            username={username}
                            userId={profileData.id}
                            isBanned={profileData.is_banned}
                            banReason={profileData.ban_reason}
                        />
                    )
                }

                {
                    showAdminModal && (
                        <AdminUserModal
                            isAdmin={profileData.isAdmin}
                            isEnglish={isEnglish}
                            setModal={setShowAdminModal}
                            username={username}
                            userId={profileData.id}
                            setProfileData={setProfileData}
                        />
                    )
                }
            </div>

        </div>

        {
            showModal && 
                <EditProfileModal
                    setShowModal={setShowModal}
                    isEnglish={isEnglish}/>
        }
        {
            showImageModal &&
                <ImageProfileModal
                    setShowImageModal={setShowImageModal}
                    isEnglish={isEnglish}/>
        }
        {
            showDeleteModal && (
                <DeletePostModal
                    postName={deleteSelectedPostName}
                    postSlug={deleteSelectedPost}
                    setShowDeleteModal={setShowDeleteModal}
                    deleteConfirm={handleDeleteConfirm}/>
            )
        }
        {
            showBannerModal && (
                <BannerProfileModal
                    setShowBannerModal={setShowBannerModal}
                    isEnglish={isEnglish}/>
            )
        }
    </div>
  );
};

export default BlogProfile;
