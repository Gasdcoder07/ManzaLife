import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const AdminRoute = () => {
    const { user } = useAuth();

    if (!user) return <Navigate to={"/auth/login"}/>
    if (!user.isAdmin) return <Navigate to={"/403"} />;

    return <Outlet/>;
};

export default AdminRoute;