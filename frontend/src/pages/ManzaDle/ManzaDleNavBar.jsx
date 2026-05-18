import { useState } from "react";
import { Link } from "react-router-dom"
import { FaSearch } from "react-icons/fa";
import { IoClose, IoMenu } from "react-icons/io5"

import logoLight from "../../../imgs/LogoLight.svg"
import logoDark from "../../../imgs/logomaxxing.svg";
import DefaultAvatar from "../../../imgs/DefaultAvatar.webp";

import { useAuth } from "../../context/AuthContext"
import { useBlogSidebarItems } from "../../hooks/useBlogSidebarItems";
import { useLanguage } from "../../context/LanguageContext";
import { useTheme } from "../../context/ThemeContext";

import UserProfile from "../../components/UserProfile";
import ToggleThemeButton from "../../components/ToggleThemeButton";
import LoginBtn from "../../components/LoginBtn/LoginBtn";

import { BlogSidebarItems } from "../../components/Blog/BlogSidebar/BlogSidebarItems";

const BlogNavbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { idioma, setIdioma } = useLanguage();
    const items = useBlogSidebarItems();
    const LoginBtnStyles = "bg-gradient-to-r from-orange-500 via-orange-600 to-orange-500 hover:bg-[position:right_center] text-white tracking-wider px-3 py-1 rounded-md font-semibold transition-all duration-500 ease-in-out inline-block shadow-md hover:shadow-lg hover:-translate-y-0.5";


    const { isDark } = useTheme();
    const { user } = useAuth();

    const handleLanguageChange = () => {
        setIdioma((prev) => (prev === "es" ? "en" : "es"));
    };

    // console.log(user)

    return (
        <nav className="bg-[#fcfcfc] dark:bg-[#0d0d0f] w-full border-b border-neutral-800/20 dark:border-neutral-800 flex justify-center items-center">
            <div className="container mx-auto flex justify-between items-center px-4 py-2 gap-6 md:px-8 lg:px-12">
                <Link to={"/"} className="shrink-0 hidden sm:flex">
                    <img
                        src={isDark ? logoDark : logoLight}
                        alt="ManzaLife"
                        className="h-10 object-cover select-none"
                    />
                </Link>

                <div className="sm:hidden shrink-0 flex justify-center items-center">
                    <IoMenu
                        onClick={() => setIsOpen(true)}
                        className="text-2xl text-white"
                    />
                </div>

                <div className="flex justify-center items-center gap-4 sm:gap-6 shrink-0">
                    <div className="flex justify-center items-center gap-2">
                        <button
                            className={
                                `cursor-pointer text-orange-600 hover:text-orange-600 transition-colors ease-in-out duration-200 px-3 py-1`
                            }
                            onClick={handleLanguageChange}
                        >
                            {idioma === "en" ? "En" : "Es"}
                        </button>

                        <ToggleThemeButton isManzaDle={true}/>
                    </div>

                    {user ? (
                        <UserProfile
                            UserAvatar={user?.avatar || DefaultAvatar}
                            Username={user.username}
                        />
                    ) : (
                        <LoginBtn />
                    )}
                </div>
            </div>

            {/* IsOpen? */}
            {isOpen && (
                <div className="sm:hidden absolute inset-0 bg-black/85 z-10">
                    <div className="relative">
                        <IoClose
                            onClick={() => setIsOpen(false)}
                            className="text-white absolute top-4 right-4 text-2xl"
                        />
                    </div>
                    <ul className="w-full h-full flex flex-col justify-center items-center gap-4">
                        {items.map((item, index) => {
                            return (
                                <li key={index}>
                                    <Link
                                        to={item.path}
                                        onClick={() => setIsOpen(false)}
                                    >
                                        <span className="text-white block text-center text-xl">
                                            {item.text}
                                        </span>
                                    </Link>
                                </li>
                            );
                        })}
                    </ul>
                </div>
            )}
        </nav>
    );
};

export default BlogNavbar;
