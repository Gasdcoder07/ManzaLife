import { useMemo, useRef, useState } from "react";
import BlogCommunityGrid from "../../components/Blog/BlogCommunity/BlogCommunityGrid";
import BlogCommunitySkeleton from "../../components/Blog/BlogCommunity/BlogCommunitySkeleton";
import { useAuth } from "../../context/AuthContext";
import { useUsers } from "../../hooks/useUsers";
import { useLanguage } from "../../context/LanguageContext";
import { useNavigate, useSearchParams } from "react-router-dom";

const BlogCommunity = () => {
    const { textos } = useLanguage();
    const { user  } = useAuth()

    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    const currentPage = Number(searchParams.get("page")) || 1;

    const topRef = useRef(null);

    const { users, loading } = useUsers(currentPage);
    const usersArray = users?.results || [];
    const totalPages = users?.count ? Math.ceil(users.count / 8) : 1;

    const handlePageChange = (newPage) => {
        topRef.current?.scrollIntoView({ behavior : "smooth" });

        if (newPage <= 1) {
            navigate("/blog/community");
        } else {
            navigate(`/blog/community?page=${newPage}`);
        }
    }

    const finalUsers = useMemo(() => {
        if (!user) return usersArray;

        return usersArray.filter(u => u.id !== user.id);
    }, [user, usersArray]);

    if (loading) return <BlogCommunitySkeleton/>;

  return (
    <div className="scroll-mt-32" ref={topRef}>
        <div className="mt-4">
                <h3 className="text-2xl">
                    {textos.main_blog.community.subtitle}{" "}
                    <span className="text-transparent bg-clip-text bg-linear-to-r from-orange-500 to-orange-800">
                        {textos.main_blog.community.title}
                    </span>
                </h3>
        </div>
        <BlogCommunityGrid
            Users={finalUsers}
            CurrentPage={currentPage}
            TotalPages={totalPages}
            OnPageChange={handlePageChange}/>
    </div>
  );
};

export default BlogCommunity;