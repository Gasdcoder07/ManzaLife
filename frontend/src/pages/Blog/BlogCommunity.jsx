import { useMemo } from "react";
import BlogCommunityGrid from "../../components/Blog/BlogCommunity/BlogCommunityGrid";
import BlogCommunitySkeleton from "../../components/Blog/BlogCommunity/BlogCommunitySkeleton";
import { useAuth } from "../../context/AuthContext";
import { useUsers } from "../../hooks/useUsers";

const BlogCommunity = () => {
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
                    Explora nuestra{" "}
                    <span className="text-transparent bg-clip-text bg-linear-to-r from-orange-500 to-orange-800">
                        comunidad
                    </span>
                </h3>
        </div>
        <BlogCommunityGrid Users={finalUsers}/>
    </>
  );
};

export default BlogCommunity;