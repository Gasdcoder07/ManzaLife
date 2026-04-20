import { useAuth } from "../../context/AuthContext";
import { NavItems } from "./NavItems";
import UserProfile from "../UserProfile"
import ToggleThemeButton from "../ToggleThemeButton";
import { Link } from "react-router-dom";
import { HashLink } from "react-router-hash-link";
import { IoClose, IoMenu } from "react-icons/io5";
import { useState } from "react";
import logo from "../../../imgs/logomaxxing.svg";

import { useLanguage } from "../../context/LanguageContext";

function Navbar() {
    const { user } = useAuth();
    const [showMobileMenu, setShowMobileMenu] = useState(false);
    const LoginBtnStyles = "bg-gradient-to-r from-orange-500 via-orange-600 to-orange-500 hover:bg-[position:right_center] text-white tracking-wider px-3 py-1 rounded-md font-semibold transition-all duration-500 ease-in-out inline-block shadow-md hover:shadow-lg hover:-translate-y-0.5";

  const { textos, idioma, setIdioma } = useLanguage();

  const traducir = (key) => {
    return textos.navbar[key] || key;
  };

  const handleLanguageChange = () => {
    setIdioma(prev => (prev === "es" ? "en" : "es"));
  }

  return (
    <nav className={`${showMobileMenu ? "fixed bg-zinc-50 dark:bg-zinc-950 inset-0" : "absolute top-0 left-0 w-full border-b border-white/30 bg-linear-to-b from-black/10 to-transparent"} z-10 transition-all duration-300`}>
      <div className={`${showMobileMenu ? "relative inset-0 h-full" : "container mx-auto flex justify-between items-center px-6 py-4 md:px-20 lg:px-32 bg-transparent"}`}>

        <Link
          to={"/"}
          className={`${showMobileMenu ? "hidden" : ""}`}>
          <img src={logo} alt="ManzaLife Logo" className="h-12 object-cover select-none"/>
        </Link>

        <div className={`${showMobileMenu ? 'h-full flex flex-col justify-center items-center gap-4 dark:text-white' : 'hidden md:flex md:items-center md:gap-4 text-white'}`}>
            <ul className={`${showMobileMenu ? "flex flex-col items-center gap-4" : "flex gap-4"}`}>
            {NavItems.map((item) => {
                const isLoginBtn = item.title === "Iniciar sesión" || item.title === "Login";
                const LinkStyles = "tracking-wider px-3 py-1 hover:text-orange-400 transition-all duration-200 ease-in-out";
                const titulo = traducir(item.title.toLowerCase());

                return (
                <li key={item.id}>
                    <Link
                        to={item.path}
                        onClick={() => setShowMobileMenu(false)}
                        className={`${showMobileMenu && "text-2xl lg:text-3xl"} ${LinkStyles}`}>
                        {titulo}
                    </Link>
                </li>
                );
            })}
            </ul>

            <button
                className={`${showMobileMenu ? 'text-black dark:text-white text-2xl lg:text-3xl' : 'text-white'} cursor-pointer hover:text-orange-400 transition-colors ease-in-out duration-200 px-3 py-1`}
                onClick={handleLanguageChange}>
                {idioma === "en" ? "EN" : "ES"}
            </button>

            <ToggleThemeButton/>

            {
                user ? (
                    <UserProfile
                        UserAvatar={user.avatar}
                        Username={user.username}/>
                ) : (
                    <Link
                        to={"/auth/login"}
                        className={`${LoginBtnStyles}`}>
                        {textos.navbar?.login}
                    </Link>
                )
            }
        </div>

        {showMobileMenu ? (
          <IoClose
            onClick={() => setShowMobileMenu(false)}
            className="absolute top-6 right-6 cursor-pointer text-black dark:text-white text-3xl hover:text-orange-500"/>
        ) : (
          <IoMenu
            onClick={() => setShowMobileMenu(true)}
            className={`${showMobileMenu ? "hidden" : "text-white text-2xl cursor-pointer md:hidden"}`}/>
        )}
      </div>
    </nav>
  );
}

export default Navbar;