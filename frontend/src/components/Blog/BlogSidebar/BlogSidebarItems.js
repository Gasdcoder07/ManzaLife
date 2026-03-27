import { FaRegUserCircle } from "react-icons/fa";
import { IoHome } from "react-icons/io5";
import { BiSolidCategory } from "react-icons/bi";
import { TbChartBarPopular } from "react-icons/tb";
import { FaUsers } from "react-icons/fa6";

export const BlogSidebarItems = [
    {
        icon: IoHome,
        text: "Home",
        path: "/blog",
    },
    {
       icon: BiSolidCategory,
        text: "Categorias",
        path: "/blog/categories"
    },
    // {
    //    icon: TbChartBarPopular,
    //     text: "Popular",
    //     path: "/blog/popular"
    // },
    {
       icon: FaUsers,
        text: "Comunidad",
        path: "/blog/community"
    },
    // {
    //    icon: FaRegUserCircle,
    //     text: "Perfil",
    //     path: "/blog/profile"
    // },
]