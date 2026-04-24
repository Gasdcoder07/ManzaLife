import { Navbar } from "../index";
import BackgroundImage from "../../../imgs/HomeResources/Barcelo.jpg";
import { FaSearch } from "react-icons/fa";

import { useLanguage } from "../../context/LanguageContext";

function Header() {
  const { textos } = useLanguage();
  console.log(textos);
  return (
    <section className="relative h-screen flex justify-center items-center">
      <Navbar />

      <div className="absolute inset-0 -z-20 h-full w-full overflow-hidden">
        <img
          className="h-full w-full object-cover"
          src={BackgroundImage}
          alt="Background Image"
        />
      </div>

      <div className="absolute inset-0 dark:bg-black/60 -z-20" />
      <div className="absolute inset-0 bg-linear-to-b from-black/40 to-zinc-50/30 dark:from-transparent dark:to-zinc-950 -z-10" />

      <div className="flex flex-col items-center gap-4 px-4">
        <h1 className="text-white text-4xl sm:text-6xl lg:text-8xl text-center tracking-wide">
          Manza
          <span className="text-transparent bg-clip-text bg-linear-to-r from-orange-500 to-orange-800">
            Life
          </span>
        </h1>

        <h3 className="text-xl text-white sm:text-2xl lg:text-3xl text-center tracking-wider">
          {textos.landing.subtitulo}
        </h3>

        {/* <div className="relative w-full max-w-4xl text-white mt-2">
          <input
            className="bg-white/20 border border-white rounded-xl w-full py-3 pl-5 pr-10 outline-none placeholder-white/50"
            type="text"
            placeholder={textos.landing.placeholder_busqueda}
          />

          <FaSearch className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer hover:text-orange-500 hover:rotate-45 transition-all ease-in-out duration-200" />
        </div> */}
      </div>
    </section>
  );
}

export default Header;