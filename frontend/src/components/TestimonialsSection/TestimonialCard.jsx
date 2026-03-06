import { FaStar } from "react-icons/fa";
const TestimonialCard = ({ img, nombre, ocupacion, testimonio }) => {
  return (  
        <div className="bg-linear-to-b from-orange-500 via-orange-600 to-orange-700 max-w-xs px-8 py-6 rounded-2xl flex flex-col items-center gap-6">

            <div className="flex justify-center">
                <img
                    className="rounded-full size-20 object-cover border border-neutral-900"
                    src={img}
                    alt={nombre} />
            </div>

            <div className="flex flex-col gap-2">
                <h3 className="font-bold text-white text-2xl text-center tracking-wider">{nombre}</h3>
                <p className="text-neutral-700 text-center text-sm">{ocupacion}</p>
            </div>

            <p className="text-neutral-900 tracking-wider min-h-42">
                {testimonio}
            </p>
            
            <div className="flex justify-center items-center gap-2">
                {
                    Array.from({ length: 5 }).map((_, i) => (
                        <FaStar className="text-yellow-400 text-2xl"/>
                    ))
                }
            </div>

        </div>
  )
}

export default TestimonialCard
