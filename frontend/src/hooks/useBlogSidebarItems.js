import { useAuth } from "../context/AuthContext"
import { FaRegUserCircle } from "react-icons/fa";
import { IoHome, IoKeypad } from "react-icons/io5";
import { BiSolidCategory } from "react-icons/bi";
// import { TbChartBarPopular } from "react-icons/tb";
import { FaUsers } from "react-icons/fa6";
import { useLanguage } from "../context/LanguageContext";

export const useBlogSidebarItems = () => {
    const { textos } = useLanguage();
    const { user } = useAuth();

    return [
        {
            icon: IoHome,
            text: textos.main_blog.sidebar_elements.home,
            path: "/blog",
        },
        {
            icon: BiSolidCategory,
            text: textos.main_blog.sidebar_elements.categories,
            path: "/blog/categories"
        },
        {
            icon: FaUsers,
            text: textos.main_blog.sidebar_elements.community,
            path: "/blog/community"
        },
        {
            icon: FaRegUserCircle,
            text: textos.main_blog.sidebar_elements.profile,
            path: user ? `/blog/profile/${user.username}` : "/auth/login"
        },
        {
            icon: IoKeypad,
            text: "ManzaDle",
            path: "/manzadle"
        }
    ]
}