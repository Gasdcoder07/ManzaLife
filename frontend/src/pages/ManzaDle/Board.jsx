export default function Board() {

    const rows = Array.from({length: 6})
    const columns = Array.from({ length: 5 })

    return (
        <div className="grid grid-rows-6 gap-2 p-2">
            {rows.map((_, rowIndex) => (
                <div key={rowIndex} className="grid grid-cols-5 gap-2">
                    {columns.map((_, colIndex) => (
                        <div
                            key={colIndex}
                            className="w-14 h-14 sm_w-16 sm:h-16 border-2 border-zinc-700 bg-transparent flex items-center justify-center text-3xl font-bold text-white uppercase select-none transition-colors duration-300"
                        >
                        </div>
                    ))}
                </div>
            ))}
        </div>
    )
}