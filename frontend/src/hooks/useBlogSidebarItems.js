import { useAuth } from "../context/AuthContext"
import { FaRegUserCircle } from "react-icons/fa";
import { IoHome, IoKeypad, IoMailUnread } from "react-icons/io5";
import { BiSolidCategory } from "react-icons/bi";
import { MdDashboard } from "react-icons/md";
import { FaUsers } from "react-icons/fa6";
import { IoIosSend } from "react-icons/io";
import { useLanguage } from "../context/LanguageContext";

export const useBlogSidebarItems = () => {
    const { textos } = useLanguage();
    const { user } = useAuth();

    const generalItems = [
        { icon: IoHome, text: textos.main_blog.sidebar_elements.explore_section.items.home, path: "/blog"},
        { icon: BiSolidCategory, text: textos.main_blog.sidebar_elements.explore_section.items.categories, path: "/blog/categories" },
        { icon: FaUsers, text: textos.main_blog.sidebar_elements.explore_section.items.community, path: "/blog/community" },
        { icon: FaRegUserCircle, text: textos.main_blog.sidebar_elements.explore_section.items.profile, 
            path: user ? `/blog/profile/${user.username}` : "/auth/login"
        },
        { icon: IoIosSend, text: textos.main_blog.sidebar_elements.explore_section.items.requests, path: "/blog/my-requests" },
        { icon: IoKeypad, text: "ManzaDle", path: "/manzadle" }
    ];

    const sections = [
        {
            section: textos.main_blog.sidebar_elements.explore_section.title,
            items: generalItems
        }
    ];

    if (user && user.isAdmin) {
        sections.push({
            section: textos.main_blog.sidebar_elements.admin_section.title,
            items: [
                { text: textos.main_blog.sidebar_elements.admin_section.items.dashboard, path: "/dashboard", icon: MdDashboard },
                { text: textos.main_blog.sidebar_elements.admin_section.items.review, path: "/dashboard/requests", icon: IoMailUnread }
            ]
        })
    }

    return sections;
}