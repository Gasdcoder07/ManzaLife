import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const AdminRoute = () => {
    const { user } = useAuth();

    if (!user) return <Navigate to={"/auth/login"}/>
    if (!user.isAdmin) return <Navigate to={"/"} />;

    return <Outlet/>;
};

export default AdminRoute;