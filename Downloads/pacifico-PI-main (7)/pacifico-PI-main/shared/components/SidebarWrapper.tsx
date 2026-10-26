"use client";

import { useAuth } from "@/features/auth/hooks/useAuth";
import Sidebar from "./Sidebar";

const SidebarWrapper = () => {
    const { user, loading } = useAuth();

    if (!user) {
        return null;
    }
    
    if (Number(user.rol_id) === 3) {
        return null;
    }

    return <Sidebar/>;
};

export default SidebarWrapper;
