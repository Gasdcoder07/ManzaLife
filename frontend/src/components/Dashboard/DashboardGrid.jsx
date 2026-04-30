import { MdArticle } from "react-icons/md";
import { BiSolidCategory } from "react-icons/bi";
import { FaUsers } from "react-icons/fa6";
import { IoMailUnread } from "react-icons/io5";
import StatsCard from "./StatsCard";
import RecentListCard from "./RecentListCard";

const DashboardGrid = ({ LatestPosts, LatestUsers }) => {
  return (
    <div className="h-full flex flex-col gap-4">
        <div className="flex flex-col py-4 gap-4">
            {/* StatsCards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 w-full">
                <StatsCard Icon={MdArticle} Description={"Publicaciones totales"} Number={20} />
                <StatsCard Icon={BiSolidCategory} Description={"Categorias totales"} Number={8} />
                <StatsCard Icon={FaUsers} Description={"Usuarios registrados"} Number={15} />
                <StatsCard Icon={IoMailUnread} Description={"Solicitudes pendientes"} Number={6} />
            </div>

            {/* RecentListCard */}
            <div className="grid grid-cols-1 xl:grid-cols-5 gap-4 w-full">

                <RecentListCard Classname={"xl:col-span-3"} Title={"Publicaciones recientes"} Data={LatestPosts} Type={"Post"}/>
                <RecentListCard Classname={"xl:col-span-2"} Title={"Usuarios recientes"} Data={LatestUsers} Type={"User"} />

            </div>
        </div>
    </div>
  );
};

export default DashboardGrid;
