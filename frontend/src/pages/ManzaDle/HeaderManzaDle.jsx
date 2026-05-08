import { useState } from "react"
import { IoHelpCircleOutline, IoStatsChartOutline } from "react-icons/io5"

export default function HeaderManzaDle({ onOpenInfo }) {

    return (
        <header className="w-full flex justify-between items-center mb-6 border-b border-zinc-800 pb-3">
            <button
                className="text-zinc-400 hover:text-orange-500 transition-colors duration-200"
                aria-label="Reglas del juego"
                onClick={onOpenInfo}
            >
                <IoHelpCircleOutline size={28} className="dark:text-white text-zinc-500"/>
            </button>
            <div className="text-center select-none">
                <h1 className="dark:text-white text-zinc-900 text-3xl md:text-4xl font-bold tracking-widest">
                    Manza<span className="text-orange-500">Dle</span>
                </h1>
            </div>
            <button
                className="text-zinc-400 hover:text-orange-500 transition-colors duration-200"
                label="Estadísticas"
            >
                <IoStatsChartOutline size={26} />
            </button>
        </header>
    )
}
