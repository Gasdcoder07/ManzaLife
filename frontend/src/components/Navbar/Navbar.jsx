import { NavItems } from "./NavItems";
import { Link } from "react-router";
import { IoMenu } from "react-icons/io5";
import logo from "../../assets/logo.png";

function Navbar() {
  return (
    <nav className="absolute top-0 left-0 z-10 w-full border-b border-white">
      <div className="relative w-full flex items-center pl-16 pr-10 py-4">

        {/* HOME - IZQUIERDA */}
        <ul className="flex ml-8">
          <li>
            <Link
              to={NavItems[0].path}
              className="text-white tracking-wider px-3 py-1 hover:text-orange-500 transition"
            >
              {NavItems[0].title}
            </Link>
          </li>
        </ul>

        {/* LOGO CENTRADO MÁS GRANDE */}
        <div className="absolute left-1/2 transform -translate-x-1/2">
          <img
            src={logo}
            alt="ManzaLife Logo"
            className="h-20 md:h-24 lg:h-28 object-contain"
          />
        </div>

        {/* RESTO DE LINKS - MÁS A LA DERECHA */}
        <ul className="ml-auto hidden md:flex gap-8 pr-6">
          {NavItems.slice(1).map((item) => (
            <li key={item.id}>
              <Link
                className="text-white tracking-wider px-3 py-1 hover:text-orange-500 transition"
                to={item.path}
              >
                {item.title}
              </Link>
            </li>
          ))}
        </ul>

        {/* MENÚ MOBILE */}
        <IoMenu className="text-white text-2xl ml-auto md:hidden" />
      </div>
    </nav>
  );
}

export default Navbar;