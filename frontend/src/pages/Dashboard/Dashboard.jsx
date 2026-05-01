import { useAuth } from "../../context/AuthContext";
import DashboardGrid from "../../components/Dashboard/DashboardGrid";
import { usePosts } from "../../hooks/usePosts";
import { useUsers } from "../../hooks/useUsers";
import { useDashboardStats } from "../../hooks/useDashboardStats";
import DashboardSkeleton from "../../components/Dashboard/DashboardSkeleton";

const Dashboard = () => {
    const { user } = useAuth();
    const { posts, loading: loadingPosts } = usePosts(1);
    const { users, loading: loadingUsers } = useUsers(1);
    const { stats, loading: loadingStats } = useDashboardStats();

    // Estado global
    const isInitialLoading = loadingPosts && loadingUsers && loadingStats;

    if (isInitialLoading) { return <DashboardSkeleton/> }

  return (
    <div className="mt-4">
        <h3 className="text-2xl font-semibold">Bienvenido {user.first_name} 👋</h3>

        <DashboardGrid
            DashboardStats={stats ? stats : []}
            LatestPosts={posts?.results || []}
            LatestUsers={users?.results || []}
            LoadingStats={loadingStats}/>

    </div>
  );
};

export default Dashboard;
