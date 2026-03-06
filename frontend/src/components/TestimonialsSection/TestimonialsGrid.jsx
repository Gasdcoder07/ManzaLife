import AxlPoto from "../../../imgs/HomeResources/Testimonials/Axl.jpeg"
import { IoStarSharp } from "react-icons/io5";

const TestimonialsGrid = () => {
  return (
    <div className="">
        <div className="bg-linear-to-b from-orange-500 via-orange-600 to-orange-700 max-w-xs px-8 py-6 rounded-md flex flex-col items-center gap-6">

            <div className="flex justify-center">
                <img
                    className="rounded-full size-20 object-cover border border-neutral-900"
                    src={AxlPoto}
                    alt="" />
            </div>

            <div className="flex flex-col gap-2">
                <h3 className="font-bold text-white text-2xl text-center tracking-wider">Axl Díaz</h3>
                <p className="text-neutral-700 text-center text-sm">Ingeniero de Software</p>
            </div>

            <p className="text-neutral-900 tracking-wider">
                "ManzaLife es el mejor sitio web para encontrar lugares en Manzanillo, gracias a ella pude promocionar el local de mi jefa y sus pasteles de carne."
            </p>
            
            <div className="flex justify-center items-center gap-2">
                {
                    Array.from({ length: 5 }).map((_, i) => (
                        <IoStarSharp className="text-yellow-400 text-2xl"/>
                    ))
                }
            </div>

        </div>
    </div>
  );
};

export default TestimonialsGrid;