import { GiBigWave } from "react-icons/gi";
import { IoMdRestaurant } from "react-icons/io";
import { FaHotel, FaUmbrellaBeach, FaPlaceOfWorship } from "react-icons/fa6";
import { LuSunMoon } from "react-icons/lu";
import Image1 from "../../../imgs/HomeResources/peñablanca.jpg"
import image3 from "../../../imgs/HomeResources/Patasalada.png"
import Image2 from "../../../imgs/HomeResources/Sunset.jpeg"
import image4 from "../../../imgs/HomeResources/feria.png"
import image5 from "../../../imgs/HomeResources/Pezvela.png"
import image6 from "../../../imgs/HomeResources/Barcelo.jpg"

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
        image: image3,
        title: "Restaurantes"
    },
    {
        id: 3,
        icon: FaUmbrellaBeach,
        image: image4,
        title: "Actividades"
    },
    {
        id: 4,
        icon: FaHotel,
        image: image6,
        title: "Hospedaje"
    },
    {
        id: 5,
        icon: FaPlaceOfWorship,
        image: image5,
        title: "Lugares turísticos"
    },
    {
        id: 6,
        icon: LuSunMoon,
        image: Image2,
        title: "Vida nocturna"
    },
]