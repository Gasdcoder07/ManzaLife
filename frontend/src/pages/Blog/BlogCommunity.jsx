import { useMemo } from "react";
import BlogCommunityGrid from "../../components/Blog/BlogCommunity/BlogCommunityGrid";
import BlogCommunitySkeleton from "../../components/Blog/BlogCommunity/BlogCommunitySkeleton";
import { useAuth } from "../../context/AuthContext";
import { useUsers } from "../../hooks/useUsers";
import { useLanguage } from "../../context/LanguageContext";

const BlogCommunity = () => {
    const { textos } = useLanguage();
    const { user  } = useAuth()
    const { users, loading } = useUsers();
    const finalUsers = useMemo(() => {
        if (!user) return users;

        return users.filter(u => u.id !== user.id);
    }, [user, users])

    // console.log(finalUsers);

    if (loading) return <BlogCommunitySkeleton/>;

  return (
    <>
        <div className="mt-4">
                <h3 className="text-2xl font-light">
                    {textos.main_blog.community.subtitle}{" "}
                    <span className="text-transparent bg-clip-text bg-linear-to-r from-orange-500 to-orange-800">
                        {textos.main_blog.community.title}
                    </span>
                </h3>
        </div>
        <BlogCommunityGrid Users={finalUsers}/>
    </>
  );
};

export default BlogCommunity;