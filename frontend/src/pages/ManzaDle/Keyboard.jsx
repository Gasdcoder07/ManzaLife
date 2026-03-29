import { IoBackspaceOutline } from "react-icons/io5";
export default function Keyboard() {

    const keyboardRows = [
        ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
        ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', 'Ñ'],
        ['ENTER', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', 'DELETE']
    ]

    return (
        <div className="w-full flex flex-col items-center gap-2 mt-4 px-1 select-none">
            {keyboardRows.map((row, rowIndex) => (
                <div key={rowIndex} className="flex justify-center gap-1 sm:gap-2 w-full max-w-125">
                    {row.map((key) => {
                        const isActionKey = key === 'ENTER' || key === 'DELETE'

                        return (
                            <button
                                key = {key}
                                className={`
                                    flex items-center justify-center rounded-md font-bold cursor-pointer transition-colors duration-200
                                    bg-orange-800/70 text-white hover:bg-orange-600 h-12 sm:h-14
                                    ${isActionKey} ? 'px-3 sm:px-5 text-xs sm:text-sm' : 'flex-1 text-sm sm_text-lg'}       
                                `}
                            >
                            {key === 'DELETE' ? (
                                <IoBackspaceOutline size={24}/>
                            ) : key === 'ENTER' ? (
                                'ENVIAR'
                            ) : (
                                key    
                            )}
                            </button>
                        )
                    })}
                </div>
            ))}
        </div>
    )
}