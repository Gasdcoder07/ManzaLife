import StatsCard from "./StatsCard";
import RecentPostsCard from "./RecentPostsCard";
import RecentUsersCard from "./RecentUsersCard";
import { MdArticle } from "react-icons/md";
import { BiSolidCategory } from "react-icons/bi";
import { FaUsers } from "react-icons/fa6";
import { IoMailUnread } from "react-icons/io5";

const DashboardGrid = ({ isEnglish, DashboardStats, LatestPosts, setLatestPosts, LatestUsers, LoadingStats }) => {
  return (
    <div className="h-full flex flex-col gap-4">
        <div className="flex flex-col py-4 gap-4">
            {/* StatsCards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 w-full">
                <StatsCard
                    Icon={MdArticle}
                    Description={isEnglish ? 'Total posts' : 'Publicaciones totales'}
                    Number={DashboardStats.posts}
                    Loading={LoadingStats} />

                <StatsCard
                    Icon={BiSolidCategory}
                    Description={isEnglish ? "Total categories" : "Categorias totales"}
                    Number={DashboardStats.categories}
                    Loading={LoadingStats} />

                <StatsCard
                    Icon={FaUsers}
                    Description={isEnglish ? "Registered users" : "Usuarios registrados"}
                    Number={DashboardStats.users}
                    Loading={LoadingStats} />

                <StatsCard
                    Icon={IoMailUnread}
                    Description={isEnglish ? "Pending requests" : "Solicitudes pendientes"}
                    Number={6}
                    Loading={LoadingStats} />
            </div>

            {/* RecentCards */}
            <div className="grid grid-cols-1 xl:grid-cols-5 gap-4 w-full">
                <RecentPostsCard
                    Classname={"xl:col-span-3"}
                    Posts={LatestPosts}
                    setPosts={setLatestPosts}/>

                <RecentUsersCard
                    Classname={"xl:col-span-2"}
                    Users={LatestUsers}/>
            </div>
        </div>
    </div>
  );
};

export default DashboardGrid;
