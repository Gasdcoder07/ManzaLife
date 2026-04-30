import { useAuth } from "../../context/AuthContext";
import DashboardGrid from "../../components/Dashboard/DashboardGrid";
import { usePosts } from "../../hooks/usePosts";
import { useUsers } from "../../hooks/useUsers";
import { useDashboardStats } from "../../hooks/useDashboardStats";

const Dashboard = () => {
    const { user } = useAuth();
    const { posts, loading } = usePosts(1);
    const { users } = useUsers(1);
    const { stats } = useDashboardStats();

    console.log(stats);

  return (
    <div className="mt-4">
        <h3 className="text-2xl font-semibold">Bienvenido {user.first_name} 👋</h3>

        <DashboardGrid DashboardStats={stats} LatestPosts={posts.results} LatestUsers={users.results}/>
    </div>
  );
};

export default Dashboard;
