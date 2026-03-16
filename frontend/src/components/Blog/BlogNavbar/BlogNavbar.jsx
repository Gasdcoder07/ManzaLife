import { Link, useNavigate } from "react-router-dom"
import logo from "../../../../imgs/logomaxxing.svg";
import { FaSearch, FaUser } from "react-icons/fa";
import { IoMenu, IoClose, IoLogOut } from "react-icons/io5"
import { useEffect, useRef, useState } from "react";
import { BlogSidebarItems } from "../BlogSidebar/BlogSidebarItems";
import { useAuth } from "../../../context/AuthContext"

const BlogNavbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const [avatarDropdownOpen, setAvatarDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target)){
                setAvatarDropdownOpen(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);

        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleLogout = () => {
        logout();
        navigate("/");
    }

    console.log(user)

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
                    <Link to={user ? "/create-post" : "/login"} className="hover:text-orange-600 transition-colors duration-200 ease-in-out">
                        <span>Crear Post</span>
                    </Link>
                    {
                        user && (
                            <div className="relative" ref={dropdownRef} onClick={() => setAvatarDropdownOpen(!avatarDropdownOpen)}>
                                <div className="relative">
                                    <img
                                        src={user.profile.avatar}
                                        alt={user.username}
                                        className="size-10 object-cover rounded-full cursor-pointer"/>
                                    <div className="absolute bottom-0 translate-x-1/2 size-2 rounded-full bg-green-600"/>
                                </div>

                                {
                                    avatarDropdownOpen && (
                                        <div className="absolute rounded-xl bg-zinc-800 border-neutral-800 shadow-lg top-full right-0 mt-2 w-48 max-h-52 z-20 overflow-y-auto custom-scrollbar">
                                            <div className="w-full h-full px-6 py-3">
                                                <div className="flex flex-col gap-2">
                                                    <div className="flex gap-2 items-center">
                                                        <FaUser/>
                                                        <span>Perfil</span>
                                                    </div>
                                                    <hr className="text-neutral-600" />
                                                    <button onClick={(handleLogout)} className="cursor-pointer rounded-lg flex gap-2 justify-center items-center px-2 py-1 hover:bg-zinc-700">
                                                        <IoLogOut/>
                                                        <span>Cerrar sesión</span>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                }

                            </div>
                        )
                    }
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
                                            <Link to={item.path} onClick={() => setIsOpen(false)}>
                                                <span className="block text-center text-xl">{item.text}</span>
                                            </Link>
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
