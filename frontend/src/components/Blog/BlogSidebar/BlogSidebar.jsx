import { useState } from "react";
import { IoMenu, IoArrowForwardOutline } from "react-icons/io5"
import { BlogSidebarItems } from "./BlogSidebarItems";
import { Link } from "react-router-dom"

const BlogSidebar = () => {
    const [isOpen, setIsOpen] = useState(true);
    const [selected, setSelected] = useState("Home");
    const Icon = isOpen ? IoMenu : IoArrowForwardOutline;

  return (
    <aside className={`relative hidden sm:flex border-r border-white ${isOpen ? 'w-56' : 'w-16'}`}>
        <div className="absolute z-20 top-4 right-0 translate-x-1/2 border border-white rounded-full p-1 bg-zinc-950">
            <Icon
                onClick={() => setIsOpen(!isOpen)}
                className="text-2xl cursor-pointer hover:text-orange-600 transition-all duration-200 ease-in-out"/>
        </div>

        <div className={`${isOpen ? 'flex' : 'hidden'} h-full w-full px-6 py-4`}>
            <ul className="w-full flex flex-col gap-4">
                {
                    BlogSidebarItems.map((item, index) => {
                        const Icon = item.icon;

                        return (
                            <li key={index}>
                                <Link onClick={() => setSelected(item.text)} to={item.path} className={`${selected == item.text ? 'text-orange-600' : ''} flex justify-center items-center gap-2 rounded-xl px-2 py-1 hover:bg-zinc-900 cursor-pointer transition-colors duration-200 ease-in-out`}>
                                    <Icon/>
                                    <span>{item.text}</span>
                                </Link>
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
