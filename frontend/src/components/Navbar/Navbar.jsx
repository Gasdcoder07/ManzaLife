import { NavItems } from "./NavItems";
import { Link } from "react-router-dom";
import { HashLink } from "react-router-hash-link";
import { IoClose, IoMenu } from "react-icons/io5";
import { useState } from "react";
import logo from "../../../imgs/logomaxxing.svg"
import { useAuth } from "../../context/AuthContext";
import UserProfile from "../UserProfile";
import ToggleThemeButton from "../ToggleThemeButton";

function Navbar() {
    const [showMobileMenu, setShowMobileMenu] = useState(false);
    const { user } = useAuth();

    const LoginBtnStyles = 'bg-gradient-to-r from-orange-500 via-orange-600 to-orange-500 bg-[length:200%_auto] hover:bg-[position:right_center] text-white tracking-wider px-4 py-2 rounded-md font-semibold transition-all duration-500 ease-in-out inline-block shadow-md hover:shadow-lg hover:-translate-y-0.5';

  return (
      <nav className={`${showMobileMenu ? "fixed bg-zinc-950 inset-0" : "absolute top-0 left-0 w-full border-b border-white/30 bg-linear-to-b from-black/10 to-transparent"} z-10 transition-all duration-300`}>
          <div className={`${showMobileMenu ? "relative inset-0 h-full" : "container mx-auto flex justify-between items-center px-6 py-4 md:px-20 lg:px-32 bg-transparent"}`}>

            <Link
                to={'/'}
                className={`${showMobileMenu ? "hidden" : ""}`}>    
                <img src={logo} alt="ManzaLife Logo" className="h-12 object-cover select-none"/>
            </Link>

            <ul className={`${showMobileMenu ? "h-full flex flex-col justify-center items-center" : "hidden md:flex"} text-white gap-2 lg:gap-6`}>
                {
                    NavItems.map((item) => {
                        return (
                            <li key={item.id}>
                                <Link
                                    to={item.path}
                                    onClick={() => setShowMobileMenu(false)}
                                    className="tracking-wider px-4 py-2 hover:text-orange-500 transition-all duration-200 ease-in-out inline-block">
                                    {item.title}
                                </Link>
                            </li>
                        )
                    })
                }

                <ToggleThemeButton/>

                {
                    user ? (
                        <UserProfile
                            UserAvatar={user.avatar}
                            Username={user.username}/>
                    ) : (
                        <li>
                            <Link
                                to={"/auth/login"}
                                onClick={() => setShowMobileMenu(false)}
                                className={LoginBtnStyles}>
                                Iniciar sesión
                            </Link>
                        </li>
                    )
                }
            </ul>

              {
                showMobileMenu ? 
                <IoClose
                    onClick={() => setShowMobileMenu(false)}
                    className="absolute top-6 right-6 cursor-pointer text-white text-3xl hover:text-orange-500"/> :

                <IoMenu
                    onClick={() => setShowMobileMenu(true)}
                    className={`${showMobileMenu ? "hidden" : "text-white text-2xl cursor-pointer md:hidden"}`}/>
              }
          </div>
      </nav>
  );
}

export default Navbar;