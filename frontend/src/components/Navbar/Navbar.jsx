import { NavItems } from "./NavItems";
import { Link } from "react-router";
import { IoClose, IoMenu } from "react-icons/io5";
import { useState } from "react";
import logo from "../../../imgs/logomaxxing.svg"

function Navbar() {
    const [showMobileMenu, setShowMobileMenu] = useState(false);

  return (
      <nav className={`${showMobileMenu ? "fixed bg-zinc-950 inset-0" : "absolute top-0 left-0 w-full border-b border-white"} z-10`}>
          <div className={`${showMobileMenu ? "relative inset-0 h-full" : "container mx-auto flex justify-between items-center px-6 py-4 md:px-20 lg:px-32 bg-transparent"}`}>

            <Link
                to={'/'}
                className={`${showMobileMenu ? "hidden" : ""}`}>    
                <img src={logo} alt="ManzaLife Logo" className="h-10 object-cover select-none"/>
            </Link>

              <ul className={`${showMobileMenu ? "h-full flex flex-col justify-center items-center" : "hidden md:flex"} gap-2 lg:gap-6`}>
                  {NavItems.map((item) => {
                      return (
                          <li key={item.id}>
                              <Link
                                    onClick={() => setShowMobileMenu(false)}
                                  className={`${showMobileMenu && "text-2xl lg:text-3xl"} text-white tracking-wider px-3 py-1 hover:text-orange-500 hover:scale-105 transition-all duration-200 ease-in-out inline-block`}
                                  to={item.path}
                              >
                                  {item.title}
                              </Link>
                          </li>
                      );
                  })}
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