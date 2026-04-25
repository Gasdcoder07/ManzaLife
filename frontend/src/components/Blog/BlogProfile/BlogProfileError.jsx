import { Link } from "react-router-dom";
import { useTheme } from "../../../context/ThemeContext";
import DarkLogo from "../../../../imgs/logomaxxing.svg";
import LightLogo from "../../../../imgs/LogoLight.svg";

const BlogProfileError = () => {
    const { isDark } = useTheme();

  return (
    <div className="py-4 flex justify-center items-center h-full">
        <div className="bg-[#fffbf8] dark:bg-[#0d0d0f] p-6 flex flex-col justify-center items-center gap-8 border border-neutral-300 dark:border-neutral-800 rounded-md shadow-md">
            <div className="flex flex-col justify-center items-center gap-2">
                <img
                    className="h-16 object-cover"
                    src={isDark ? DarkLogo : LightLogo}
                    alt="ManzaLife Logo"/>
                <h2 className="text-3xl tracking-wider text-center">Nadie en <span className="text-transparent bg-clip-text bg-linear-to-r from-orange-500 to-orange-800">ManzaLife</span> tiene ese nombre.</h2>
                <p className="text-neutral-500 dark:text-neutral-300 text-center">La cuenta pudo haber sido eliminada o el nombre de usuario es incorrecto.</p>
            </div>
            
            <Link to={"/blog/community"}
                className="bg-orange-600 px-6 py-1 rounded hover:text-zinc-950 hover:-translate-y-1 transition-all duration-200 ease-in-out shadow-lg">
                Explora la comunidad
            </Link>
        </div>
    </div>
  );
};

export default BlogProfileError;
