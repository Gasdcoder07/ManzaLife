import { Link } from "react-router-dom"
import logo from "../../../../imgs/logomaxxing.svg";
import { FaSearch } from "react-icons/fa";
import { IoMenu, IoClose } from "react-icons/io5"
import { useState } from "react";
import { BlogSidebarItems } from "../BlogSidebar/BlogSidebarItems";

const BlogNavbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className="w-full border-b border-white flex justify-center items-center">
            <div className="container mx-auto flex justify-between items-center px-4 py-2 gap-6 md:px-8 lg:px-12">
                <Link to={"/"} className="shrink-0 hidden sm:flex">
                    <img
                        src={logo}
                        alt="ManzaLife"
                        className="h-10 object-cover select-none"
                    />
                </Link>

                <div className="sm:hidden shrink-0 flex justify-center items-center">
                    <IoMenu
                        onClick={() => setIsOpen(true)}
                        className="text-2xl"/>
                </div>

                <div className="relative w-full max-w-2xl text-white mx-auto flex justify-center items-center">
                    <input
                        className="bg-neutral-900 border border-white rounded-xl w-full py-3 pl-5 pr-10 outline-none placeholder-white/50"
                        type="text"
                        placeholder="Playas, plazas o restaurantes"
                    ></input>
                    <FaSearch className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer hover:text-orange-500 hover:rotate-45 transition-all ease-in-out duration-200" />
                </div>

                <div className="flex justify-center items-center gap-4 shrink-0">
                    <Link to={"/create-post"} className="hover:text-orange-600 transition-colors duration-200 ease-in-out">
                        <span>Crear Post</span>
                    </Link>
                    <div className="size-10 rounded-full bg-amber-200" />
                </div>
            </div>

            {/* IsOpen? */}
            {
                isOpen && (
                    <div className="sm:hidden absolute inset-0 bg-black/85 z-10">
                        <div className="relative">
                            <IoClose
                                onClick={() => setIsOpen(false)}
                                className="absolute top-4 right-4 text-2xl"/>
                        </div>
                        <ul className="w-full h-full flex flex-col justify-center items-center gap-4">
                            {
                                BlogSidebarItems.map((item, index) => {
                                    return (
                                        <li key={index}>
                                            <span className="block text-center text-xl">{item.text}</span>
                                        </li>
                                    )
                                })
                            }
                        </ul>
                    </div>
                )
            }

        </nav>
    );
};

export default BlogNavbar;
