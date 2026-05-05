import { useAuth } from "../../context/AuthContext";
import { useLanguage } from "../../context/LanguageContext";
import DashboardGrid from "../../components/Dashboard/DashboardGrid";
import { usePosts } from "../../hooks/usePosts";
import { useUsers } from "../../hooks/useUsers";
import { useDashboardStats } from "../../hooks/useDashboardStats";
import DashboardSkeleton from "../../components/Dashboard/DashboardSkeleton";
import { useEffect, useState } from "react";

const Dashboard = () => {
    const { idioma } = useLanguage();
    const { user } = useAuth();
    const { posts, loading: loadingPosts } = usePosts(1);
    const { users, loading: loadingUsers } = useUsers(1);
    const { stats, loading: loadingStats } = useDashboardStats();
    
    const [ latestPosts, setLatestPosts ] = useState([]);

    const isEnglish = idioma === "en";

    useEffect(() => {
        if (posts?.results) {
            setLatestPosts(posts.results);
        }
    }, [posts]);

    // Estado global
    const isInitialLoading = loadingPosts && loadingUsers && loadingStats;

    if (isInitialLoading) { return <DashboardSkeleton/> }

  return (
    <div className="mt-4">
        <h3 className="text-2xl font-semibold">
            {isEnglish ? 'Welcome' : 'Bienvenido'} {user.first_name} 👋
        </h3>

        <DashboardGrid
            isEnglish={isEnglish}
            DashboardStats={stats ? stats : []}
            LatestPosts={latestPosts}
            setLatestPosts={setLatestPosts}
            LatestUsers={users?.results || []}
            LoadingStats={loadingStats}/>

    </div>
  );
};

export default Dashboard;
