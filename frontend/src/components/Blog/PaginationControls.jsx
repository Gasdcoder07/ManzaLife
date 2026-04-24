import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

const PaginationControls = ({ currentPage, totalPages, onPageChange }) => {
    const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

    if (totalPages <= 1) return null;

  return (
    <div className="flex justify-center items-center py-4 pb-8 gap-2">
        <button
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className={`p-2 rounded-full flex items-center justify-center transition-all ${currentPage === 1 ? 'bg-white/5 cursor-not-allowed' : 'bg-white/5 hover:bg-white/10 cursor-pointer'}`}>
            <FaArrowLeft/>
        </button>

        {
            pages.map((i) => {
                const isActive = currentPage === i;

                return (
                    <div
                        key={i}
                        onClick={() => onPageChange(i)}
                        className={`p-2 min-w-10 rounded-xl flex justify-center items-center cursor-pointer transition-all ${isActive ? 'bg-orange-600 text-white font-bold' : 'bg-black/5 hover:bg-black/10 dark:bg-white/5 dark:hover:bg-white/10'}`}>
                        <span>{i}</span>
                    </div>
                )
            })
        }

        <button
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={`p-2 rounded-full flex items-center justify-center transition-all ${currentPage === totalPages ? 'bg-white/5 cursor-not-allowed' : 'bg-white/5 hover:bg-white/10 cursor-pointer'}`}>
            <FaArrowRight/>
        </button>
    </div>
  );
};

export default PaginationControls;
