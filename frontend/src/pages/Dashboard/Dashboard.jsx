import { useAuth } from "../../context/AuthContext";
import DashboardGrid from "../../components/Dashboard/DashboardGrid";
import { usePosts } from "../../hooks/usePosts";
import { useUsers } from "../../hooks/useUsers";

const Dashboard = () => {
    const { user } = useAuth();
    const { posts, loading } = usePosts(1);
    const { users } = useUsers(1);

    console.log(users);

  return (
    <div className="mt-4">
        <h3 className="text-2xl font-semibold">Bienvenido {user.first_name} 👋</h3>

        <DashboardGrid LatestPosts={posts.results} LatestUsers={users.results}/>
    </div>
  );
};

export default Dashboard;
