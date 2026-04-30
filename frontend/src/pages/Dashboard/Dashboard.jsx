import { useAuth } from "../../context/AuthContext";
import DashboardGrid from "../../components/Dashboard/DashboardGrid";
import { usePosts } from "../../hooks/usePosts";

const Dashboard = () => {
    const { user } = useAuth();
    const { posts, loading } = usePosts(1);
    
  return (
    <div className="mt-4">
        <h3 className="text-2xl">Bienvenido {user.first_name} 👋</h3>

        <DashboardGrid LatestPosts={posts.results}/>
    </div>
  );
};

export default Dashboard;
