import { HashLink } from 'react-router-hash-link';
import logo from "../../../imgs/logomaxxing.svg";
import { FooterItems, FooterIconsItems } from "./FooterItems";
import { useLanguage } from "../../context/LanguageContext";

const Footer = () => {
    const { textos } = useLanguage();

    return (
        <div className="bg-zinc-50 dark:bg-zinc-950 pt-4 md:pt-10 lg:pt-12">
            <footer className="bg-orange-600 text-white dark:bg-zinc-950 py-5">
                <div className="container mx-auto flex flex-col px-6 py-4 md:px-20 lg:px-32 gap-6">
                    <div className="flex justify-between items-center">
                        <img src={logo} alt="ManzaLife Logo" className="h-10" />
                        <div className="flex items-center gap-4">
                            {FooterIconsItems.map((item) => {
                                const Icon = item.icono;
                                return (
                                    <a
                                        key={item.id}
                                        href={item.path}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="group bg-white/10 dark:bg-neutral-800 p-2 rounded-full hover:scale-115 transition-all duration-200 ease-in-out"
                                    >
                                        <Icon className="dark:group-hover:text-orange-600 transition-all duration-200 ease-in-out" />
                                    </a>
                                );
                            })}
                        </div>
                    </div>

                    <div className="w-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 place-content-center gap-10">
                        {FooterItems.map((item, index) => {
                            return (
                                <div key={index} className="flex flex-col gap-1">
                                    <p className="font-bold">
                                        {textos.footer[item.key]?.titulo || item.title}
                                    </p>
                                    <ul>
                                        {item.subthemes.map((sub, i) => {
                                            return (
                                                <li key={i}>
                                                    <HashLink
                                                        to={sub.path}
                                                        className='text-neutral-200 text-[15px] hover:text-neutral-300 duration-200 transition-all ease-in-out cursor-pointer'
                                                    >
                                                        <span>
                                                            {textos.footer[item.key]?.items[i] || sub.title_theme}
                                                        </span>
                                                    </HashLink>
                                                </li>
                                            );
                                        })}
                                    </ul>
                                </div>
                            );
                        })}
                    </div>

                    <hr className="border border-white/10 dark:border-neutral-900" />

                    <p className="text-center text-sm">
                        © {new Date().getFullYear()}{" "}{textos.footer.derechos}
                    </p>
                </div>
            </footer>
        </div>
    );
};

export default Footer;