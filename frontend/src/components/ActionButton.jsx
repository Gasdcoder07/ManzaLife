import { FaArrowRight } from "react-icons/fa6";
import { Link } from "react-router-dom";

const ActionButton = ({Path, Text}) => {
    return (
        <Link to={`${Path}`} className={`text-white bg-orange-600 w-full md:w-1/2 lg:w-2/5 xl:w-1/5 py-2 rounded-md hover:-translate-y-1 hover:text-zinc-950 transition-all duration-200 ease-in-out flex justify-center items-center gap-2`}>
            <span>{Text}</span>
            <FaArrowRight/>
        </Link>
    );
};

export default ActionButton;
