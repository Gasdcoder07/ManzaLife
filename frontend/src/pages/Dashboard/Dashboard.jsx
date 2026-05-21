import { useAuth } from "../../context/AuthContext";
import { useLanguage } from "../../context/LanguageContext";
import DashboardGrid from "../../components/Dashboard/DashboardGrid";
import { usePosts } from "../../hooks/usePosts";
import { useUsers } from "../../hooks/useUsers";
import { useDashboardStats } from "../../hooks/useDashboardStats";
import { useRequests } from "../../hooks/useRequests";
import DashboardSkeleton from "../../components/Dashboard/DashboardSkeleton";
import { useEffect, useState } from "react";
import { FaSquarePlus } from "react-icons/fa6";

const Dashboard = () => {
    const { idioma } = useLanguage();
    const { user } = useAuth();
    const { posts, loading: loadingPosts } = usePosts(1);
    const { users, loading: loadingUsers } = useUsers(1);
    const { stats, loading: loadingStats } = useDashboardStats();
    // const { requests, loading: loadingRequests } = useRequests({ all: true});
    
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
        <div className="flex items-center justify-between gap-4">
            <h3 className="text-2xl font-semibold tracking-wide">
                {isEnglish ? 'Welcome' : 'Bienvenido'} {user.first_name} 👋
            </h3>

            <button
                className="group shrink-0 flex justify-center items-center gap-2 bg-[#fcfcfc] dark:bg-[#0d0d0f] border border-neutral-300 dark:border-neutral-800 rounded-xl shadow-xl px-5 py-2 cursor-pointer hover:text-orange-600">
                <FaSquarePlus className="transition-colors duration-200 ease-in-out"/>
                <span className="transition-colors duration-200 ease-in-out">
                    {isEnglish ? 'Create category' : 'Crear categoria'}
                </span>
            </button>
        </div>

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
