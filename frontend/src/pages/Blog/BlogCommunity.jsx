import BlogCommunityGrid from "../../components/Blog/BlogCommunity/BlogCommunityGrid";
import BlogCommunitySkeleton from "../../components/Blog/BlogCommunity/BlogCommunitySkeleton";
import { useUsers } from "../../hooks/useUsers";

const BlogCommunity = () => {
    const { users, loading } = useUsers();
    console.log(users);

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
        <BlogCommunityGrid Users={users}/>
    </>
  );
};

export default BlogCommunity;