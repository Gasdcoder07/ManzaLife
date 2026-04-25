import { Outlet } from "react-router-dom";
import { BlogNavbar, BlogSidebar } from "../components/Blog/index"

const BlogLayout = () => {
  return (
    <div className="relative bg-zinc-950 dark:text-white h-screen w-full flex flex-col">
        <BlogNavbar/>

        <section className="flex-1 flex w-full overflow-hidden">
            <BlogSidebar/>

            <div className="bg-zinc-100 dark:bg-transparent flex-1 container mx-auto w-full px-4 md:px-10 lg:px-22 overflow-y-auto custom-scrollbar">

                {/* --> Componentes Hijos aca  */}
                <Outlet/>

            </div>
        </section>
    </div>
  );
};

export default BlogLayout;