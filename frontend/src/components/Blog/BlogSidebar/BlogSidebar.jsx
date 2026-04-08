import { useEffect, useState } from "react";
import { IoMenu, IoArrowForwardOutline } from "react-icons/io5"
import { BlogSidebarItems } from "./BlogSidebarItems";
import { Link, NavLink } from "react-router-dom"
import { useBlogSidebarItems } from "../../../hooks/useBlogSidebarItems";

const BlogSidebar = () => {
    const [isOpen, setIsOpen] = useState(() => {
        const saved = localStorage.getItem("sidebar-open");
        return saved !== null ? JSON.parse(saved) : true;
    });

    const items = useBlogSidebarItems()

    useEffect(() => {
        localStorage.setItem("sidebar-open", JSON.stringify(isOpen));
    }, [isOpen]);

  return (
    <aside className={`relative hidden sm:flex border-r border-neutral-700 ${isOpen ? 'w-56' : 'w-16'}`}>
        <div className="absolute z-20 top-4 right-0 translate-x-1/2 border border-neutral-700 rounded-full p-1 bg-zinc-950">
            <IoMenu
                onClick={() => setIsOpen(!isOpen)}
                className="text-2xl cursor-pointer hover:text-orange-600 transition-all duration-200 ease-in-out"/>
        </div>

        <div className={`${isOpen ? 'flex' : 'hidden'} h-full w-full px-6 py-4`}>
            <ul className="w-full flex flex-col gap-4">
                {
                    items.map((item, index) => {
                        const Icon = item.icon;

                        return (
                            <li key={index}>
                                <NavLink
                                    to={item.path}
                                    end={item.path === "/blog"}
                                    className={({ isActive }) => `flex justify-center items-center gap-2 rounded-xl px-6 py-2 hover:bg-white/5 cursor-pointer transition-colors duration-200 ease-in-out ${isActive ? 'text-orange-600 bg-white/5' : ''}`}>
                                    <Icon/>
                                    <span>{item.text}</span>
                                </NavLink>
                            </li>
                        )
                    })
                }
            </ul>
        </div>
    </aside>
  );
};

export default BlogSidebar;
