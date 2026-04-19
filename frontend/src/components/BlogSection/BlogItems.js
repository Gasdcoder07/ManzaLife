import { FaCamera, FaUmbrellaBeach, FaStar, FaShare, FaComments, FaHeart, FaChartLine } from "react-icons/fa";
import { IoIosBusiness } from "react-icons/io";
import { BiWorld } from "react-icons/bi";
import { MdAccountBox } from "react-icons/md";

export const BlogItems = [
    {
        id: 1,
        icon: FaCamera,
        color: "text-slate-600",
        text: "Comparte lugares hermosos."
    },
    {
        id: 2,
        icon: FaUmbrellaBeach,
        color: "text-green-800",
        text: "Encuentra rincones únicos."
    },
    {
        id: 3,
        icon: IoIosBusiness,
        color: "text-stone-600",
        text: "Promociona tu negocio local."
    },
    {
        id: 4,
        icon: FaStar,
        color: "text-yellow-500",
        text: "Ayuda a otros a descubrir la ciudad."
    }
]

export const HowItWorksItems = [
    {
        id: 1,
        icon: BiWorld,
        iconStyle: "text-sky-700",
        title: "Explora",
        description: "Descubre artículos y contenido sobre Manzanillo."
    },
    {
        id: 2,
        icon: MdAccountBox,
        iconStyle: "text-orange-600",
        title: "Crea",
        description: "Regístrate gratis y forma parte de la comunidad."
    },
    {
        id: 3,
        icon: FaShare,
        iconStyle: "text-yellow-500",
        title: "Comparte",
        description: "Publica y promociona negocios o lugares locales."
    },
    {
        id: 4,
        icon: FaComments,
        iconStyle: "text-green-600",
        title: "Interactúa",
        description: "Comenta, opina y conecta con otros usuarios."
    },
    {
        id: 5,
        icon: FaHeart,
        iconStyle: "text-red-500",
        title: "Apoya",
        description: "Ayuda a impulsar los negocios y lugares locales."
    },
    {
    id: 6,
    icon: FaChartLine,
    iconStyle: "text-purple-500",
    title: "Crece",
    description: "Haz crecer tu negocio o proyecto local."
    }
];