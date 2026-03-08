import Sunset from "../../../imgs/HomeResources/Sunset.jpeg";
import Barcelo from "../../../imgs/HomeResources/Barcelo.jpg";
import Penablanca from "../../../imgs/HomeResources/peñablanca.jpg";
import LasHadas from "../../../imgs/LoginResources/Login_hadas.jpeg";
import PostItem from "./PostItem";

const PostsGrid = () => {
  return (
      <div className="overflow-x-auto scroll-smooth no-scrollbar">
          <div className="flex gap-8 w-max py-2">
              <PostItem
                  Image={Sunset}
                  Category="Vida Nocturna"
                  Title="Sunset Bar & Lounge"
                  Description="Disfruta bebidas, música y un ambiente único en uno de los bares más conocidos de Manzanillo."
                  Autor="Manuel Martínez"
                  Date="08 / 03 / 2026"
              />

              <PostItem
                  Image={Barcelo}
                  Category="Hospedaje"
                  Title="Barceló Karmina Palace Deluxe"
                  Description="Uno de los hoteles más lujosos de Manzanillo, famoso por su arquitectura inspirada en templos mayas, vistas al Pacífico y su experiencia todo incluido ideal para vacaciones frente al mar."
                  Autor="Manuel Martínez"
                  Date="06 / 03 / 2026"
              />

              <PostItem
                  Image={Penablanca}
                  Category="Playas"
                  Title="Playa Peña Blanca"
                  Description="Una de las playas más tranquilas y bonitas cerca de Manzanillo, conocida por su arena clara, aguas cristalinas y ambiente perfecto para relajarse lejos del ruido de la ciudad."
                  Autor="Manuel Martínez"
                  Date="03 / 03 / 2026"
              />

              <PostItem
                  Image={LasHadas}
                  Category="Hospedaje"
                  Title="Las Hadas Manzanillo"
                  Description="Un icónico resort frente al mar famoso por su arquitectura blanca estilo mediterráneo, su marina privada y las hermosas vistas de la Bahía de Manzanillo, ideal para disfrutar del lujo y la tranquilidad."
                  Autor="Manuel Martínez"
                  Date="01 / 03 / 2026"
              />
          </div>
      </div>
  );
};

export default PostsGrid;