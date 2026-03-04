import { GiBigWave } from "react-icons/gi";
import { IoMdRestaurant } from "react-icons/io";
import { FaHotel, FaUmbrellaBeach, FaPlaceOfWorship } from "react-icons/fa6";
import { LuSunMoon } from "react-icons/lu";
import Image1 from "../../../imgs/HomeResources/peñablanca.jpg"
import Image2 from "../../../imgs/HomeResources/Sunset.jpeg"

export const CategoriesItems = [
    {
        id: 1,
        icon: GiBigWave,
        image: Image1,
        title: "Playas"
    },
    {
        id: 2,
        icon: IoMdRestaurant,
        image: Image1,
        title: "Restaurantes"
    },
    {
        id: 3,
        icon: FaUmbrellaBeach,
        image: Image1,
        title: "Actividades"
    },
    {
        id: 4,
        icon: FaHotel,
        image: Image1,
        title: "Hospedaje"
    },
    {
        id: 5,
        icon: FaPlaceOfWorship,
        image: Image1,
        title: "Lugares turísticos"
    },
    {
        id: 6,
        icon: LuSunMoon,
        image: Image2,
        title: "Vida nocturna"
    },
]