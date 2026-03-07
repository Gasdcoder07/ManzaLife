import { Link } from "react-router";
import logo from "../../../imgs/logomaxxing.svg";
import { FooterCategoryItems, FooterIconsItems } from "./FooterItems";

const Footer = () => {
    return (
        <footer className="text-white bg-zinc-950 py-5">
            <div className="container mx-auto flex flex-col px-6 py-4 md:px-20 lg:px-32 gap-4">
                <div className="flex justify-between items-center">
                    <img src={logo} alt="ManzaLife Logo" className="h-10" />

                    <div className="flex items-center gap-4">
                        {
                            FooterIconsItems.map((item) => {
                                const Icon = item.icono;

                                return (
                                    <a
                                        key={item.id}
                                        href={item.path}
                                        target="_blank"
                                        className="group bg-neutral-800 p-2 rounded-full hover:scale-115 transition-all duration-200 ease-in-out">
                                        <Icon className="group-hover:text-orange-600 transition-all duration-200 ease-in-out"/>
                                    </a>
                                );
                            })
                        }
                    </div>
                </div>

                <div>
                    <p className="font-bold mb-1">Categorias</p>

                    <ul className="flex flex-col gap-1">
                        {
                            FooterCategoryItems.map((item) => {
                                return (
                                    <li key={item.id}>
                                        <Link
                                            className="text-neutral-400 text-[15px] hover:text-neutral-500 duration-200 transition-all ease-in-out">
                                            {item.title}
                                        </Link>
                                    </li>
                                )
                            })
                        }
                    </ul>
                </div>

                <hr className="border border-neutral-900"/>

                <p className="text-center text-sm">
                    © {new Date().getFullYear()} ManzaLife. Todos los derechos
                    reservados.
                </p>
            </div>
        </footer>
    );
};

export default Footer;
