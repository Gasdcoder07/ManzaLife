import { useEffect, useState } from "react";
import { IoMenu, IoArrowForwardOutline, IoKeypad } from "react-icons/io5"
import { BlogSidebarItems } from "./BlogSidebarItems";
import { Link, NavLink } from "react-router-dom"
import { useBlogSidebarItems } from "../../../hooks/useBlogSidebarItems";
import { useLanguage } from "../../../context/LanguageContext";

const BlogSidebar = () => {
    const [isOpen, setIsOpen] = useState(() => {
        const saved = localStorage.getItem("sidebar-open");
        return saved !== null ? JSON.parse(saved) : true;
    });

    const { textos, idioma } = useLanguage();
    const items = useBlogSidebarItems()

    useEffect(() => {
        localStorage.setItem("sidebar-open", JSON.stringify(isOpen));
    }, [isOpen]);

  return (
    <aside className={`bg-[#fffbf8] shadow-xl shadow-black/40 dark:bg-[#0d0d0f] relative hidden sm:flex sm:flex-col sm:justify-between border-r border-neutral-800/20 dark:border-neutral-800 ${isOpen ? 'w-56' : 'w-16'}`}>
        <div className="absolute z-20 top-4 right-0 translate-x-1/2 border border-neutral-800/30 dark:border-neutral-800 rounded-full p-1 bg-[#fffbf8] dark:bg-[#0d0d0f] text-zinc-950 dark:text-white">
            <IoMenu
                onClick={() => setIsOpen(!isOpen)}
                className="text-2xl cursor-pointer hover:text-orange-600 transition-all duration-200 ease-in-out"/>
        </div>

        <div className={`${isOpen ? 'flex flex-col gap-4' : 'hidden'} h-full w-full px-6 py-4 custom-scrollbar`}>
            <ul className="w-full flex flex-col gap-4 text-zinc-950 dark:text-white">
                {
                    items.map((item, index) => {
                        const Icon = item.icon;

                        return (
                            <li key={index}>
                                <NavLink
                                    to={item.path}
                                    end={item.path === "/blog"}
                                    className={({ isActive }) => `flex justify-start items-center gap-2 rounded-xl px-6 py-2 hover:bg-black/5 dark:hover:text-orange-600 dark:hover:bg-white/5 cursor-pointer transition-colors duration-200 ease-in-out ${isActive && 'text-orange-600'}`}>
                                    <Icon/>
                                    <span>{item.text}</span>
                                </NavLink>
                            </li>
                        )
                    })
                }
            </ul>
        </div>
        <div className={`${!isOpen && 'hidden'} px-6 py-4`}>
            <p className="text-xs w-3/5 text-zinc-950 dark:text-neutral-500">
                © {new Date().getFullYear()}{" "}{textos.footer.derechos}
            </p>
        </div>
    </aside>
  );
};

export default BlogSidebar;
