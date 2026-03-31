import { IoClose } from "react-icons/io5"

export default function GameModal({ secretWord, description }) {
    const isWin = true
    return (
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8 max-w-sm w-full mx-4 relative shadow-2xl flex flex-col items-center text-center">
            <button 
                className="absolute top-4 right-4 text-zinc-400 hover:text-orange-500 transition-colors"
                aria-label="Cerrar modal"
            >
                <IoClose />
            </button>
            <h2 className={`text-3xl font-bold mb-2 ${isWin ? 'text-white' : 'text-zinc-100'}`}>
                {isWin ? "¡Felicidades!" : "¡Casi lo logras!"}
            </h2>
            <p className="text-zinc-400 mb-6 font-light">
                {description}
            </p>
            <div className="bg-zinc-950 border border-zinc-800/50 rounded-xl px-8 py-4 mb-8 w-full shadow-inner">
                <span className="text-3xl font-bold tracking-[0.2em] text-orange-500 uppercase">
                    {secretWord}
                </span>
            </div>
            <button className="bg-orange-600 hover:bg-orange-500 text-white font-semibold py-3 px-8 rounded-full shadow-md hover:shadow-lg hover:-trnslate-y-0.5 translate-all duration-300 w-full tracking-wide">
                Jugar de nuevo
            </button>
        </div>
    )
}