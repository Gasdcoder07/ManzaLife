import { FaArrowRight } from "react-icons/fa6";

const PostActionButton = () => {
  return (
    <div className="flex justify-center items-center gap-2 bg-neutral-800 px-3 py-2 rounded-xl text-sm hover:text-orange-600 cursor-pointer transition-all duration-200 ease-in-out">
        <span>Seguir leyendo</span>
        <FaArrowRight/>
    </div>
  );
};

export default PostActionButton;
