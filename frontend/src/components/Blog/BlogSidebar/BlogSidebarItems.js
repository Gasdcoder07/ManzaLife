
import { IoHome } from "react-icons/io5";
import { BiSolidCategory } from "react-icons/bi";
import { TbChartBarPopular } from "react-icons/tb";

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
     {
       icon: TbChartBarPopular,
        text: "Popular",
        path: "/blog/popular"
    }
]