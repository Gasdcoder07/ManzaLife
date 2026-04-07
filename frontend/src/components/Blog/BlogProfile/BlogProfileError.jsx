import { Link } from "react-router-dom";
import ManzaLifeLogo from "../../../../imgs/logomaxxing.svg";

const BlogProfileError = () => {
  return (
    <div className="py-4 flex flex-col justify-center items-center gap-8 h-full">
        <div className="flex flex-col justify-center items-center gap-2">
            <img
                className="h-16 object-cover"
                src={ManzaLifeLogo}
                alt="ManzaLife Logo"/>
            <h2 className="text-3xl tracking-wider text-center">Nadie en <span className="text-transparent bg-clip-text bg-linear-to-r from-orange-500 to-orange-800">ManzaLife</span> tiene ese nombre.</h2>
            <p className="text-neutral-300 text-center">La cuenta pudo haber sido eliminada o el nombre de usuario es incorrecto.</p>
        </div>
        
        <Link to={"/blog/community"}
            className="bg-orange-600 px-6 py-1 rounded hover:text-zinc-950 hover:-translate-y-1 transition-all duration-200 ease-in-out">
            Explora la comunidad
        </Link>
    </div>
  );
};

export default BlogProfileError;
