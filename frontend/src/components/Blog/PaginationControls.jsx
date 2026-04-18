import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

const PaginationControls = () => {
  return (
    <div className="flex justify-center items-center py-4 pb-8 gap-2">
        <button className="p-2 bg-white/5 rounded-full hover:bg-white/10 cursor-pointer">
            <FaArrowLeft/>
        </button>

        {
            [1, 2, 3, 4, 5].map((i) => {
                return (
                    <div
                        key={i}
                        className="p-2 min-w-10 bg-white/5 rounded-xl flex justify-center items-center hover:bg-white/10 cursor-pointer">
                        <span>{i}</span>
                    </div>
                )
            })
        }

        <button className="p-2 bg-white/5 rounded-full hover:bg-white/10 cursor-pointer">
            <FaArrowRight/>
        </button>
    </div>
  );
};

export default PaginationControls;
