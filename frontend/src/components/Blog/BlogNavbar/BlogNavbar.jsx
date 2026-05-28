import { Link, useNavigate } from "react-router-dom"
import logoLight from "../../../../imgs/LogoLight.svg";
import logoDark from "../../../../imgs/logomaxxing.svg";
import { FaSearch } from "react-icons/fa";
import { IoClose, IoMenu } from "react-icons/io5"
import { useRef, useState } from "react";
import { BlogSidebarItems } from "../BlogSidebar/BlogSidebarItems";
import { useAuth } from "../../../context/AuthContext"
import DefaultAvatar from "../../../../imgs/DefaultAvatar.webp";
import UserProfile from "../../UserProfile";
import ToggleThemeButton from "../../ToggleThemeButton";
import { useLanguage } from "../../../context/LanguageContext";
import { useTheme } from "../../../context/ThemeContext";
import { useBlogSidebarItems } from "../../../hooks/useBlogSidebarItems";
import LoginBtn from "../../LoginBtn/LoginBtn";

const BlogNavbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { idioma, setIdioma } = useLanguage();
    const isEnglish = idioma === "en";

    const navBar = useBlogSidebarItems();
    const LoginBtnStyles = "bg-gradient-to-r from-orange-500 via-orange-600 to-orange-500 hover:bg-[position:right_center] text-white tracking-wider px-3 py-1 rounded-md font-semibold transition-all duration-500 ease-in-out inline-block shadow-md hover:shadow-lg hover:-translate-y-0.5";

    const { isDark } = useTheme();
    const { user } = useAuth();

    const handleLanguageChange = () => {
        setIdioma((prev) => (prev === "es" ? "en" : "es"));
    };

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
                        className="text-2xl"
                    />
                </div>

                <div className="flex justify-center items-center gap-4 sm:gap-6 shrink-0">
                    <Link
                        to={user ? "/create-post" : "/auth/login"}
                        className="hover:text-orange-600 transition-colors duration-200 ease-in-out"
                    >
                        <span>
                            {isEnglish ? "Create Post" : "Crear Post"}
                        </span>
                    </Link>

                    <div className="flex justify-center items-center gap-2">
                        <button
                            className={
                                "cursor-pointer hover:text-orange-600 transition-colors ease-in-out duration-200 px-3 py-1"
                            }
                            onClick={handleLanguageChange}
                        >
                            {isEnglish ? "En" : "Es"}
                        </button>

                        <ToggleThemeButton isBlog={true}/>
                    </div>

                    {user ? (
                        <UserProfile
                            UserAvatar={user?.avatar || DefaultAvatar}
                            Username={user.username}
                            isEnglish={isEnglish}
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
                    <ul className="w-full h-full flex flex-col justify-center items-center gap-8">
                        {navBar.map((section, index) => {
                            return (
                                <div
                                    key={index}
                                    className="flex flex-col gap-4 w-full justify-center items-center">

                                    {
                                        navBar.length > 1 && (
                                            <p className="italic tracking-wider text-[#fcfcfc] text-xl">{section.section}</p>
                                        )
                                    }

                                    <ul className="w-full flex flex-col justify-center items-center gap-2">
                                        {
                                            section.items.map((item, index) => {
                                                return (
                                                    <li
                                                        key={index}>
                                                            <Link
                                                                onClick={() => setIsOpen(false)}
                                                                to={item.path}
                                                                className="tracking-wider text-center text-[#fcfcfc] text-2xl">
                                                                {item.text}
                                                            </Link>
                                                    </li>
                                                )
                                            })
                                        }
                                    </ul>
                                </div>
                            );
                        })}
                    </ul>
                </div>
            )}
        </nav>
    );
};

export default BlogNavbar;
