export default function Board({ guesses, currentGuess, turn, solution }) {
    const wordLength = solution.length
    const rows = Array.from({length: 6})

    const styles = {
        empty: "bg-[#fcfcfc] dark:bg-transparent border-zinc-200 dark:border-zinc-700",
        filled: "bg-zinc-200 border-zinc-200 dark:bg-zinc-800 dark:border-zinc-800",
        correct: "bg-green-500 border-green-500 dark:bg-green-600 dark:border-green-600",
        present: "bg-yellow-400 border-yellow-400 dark:bg-yellow-500 dark:border-yellow-500"
    }

    const getColors = (guess) => {
        if (!guess) return Array(wordLength).fill(styles.empty)
        
        const result = Array(wordLength).fill(styles.filled)

        const solutionChars = solution.split("")
        const guessChars = guess.split("")

        guessChars.forEach((char, i) => {
            if (char === solutionChars[i]) {
                result[i] = styles.correct
                solutionChars[i] = null
                guessChars[i] = null
        }})

        guessChars.forEach((char, i) => {
            if (char !== null && solutionChars.includes(char)) {
                result[i] = styles.present
                solutionChars[solutionChars.indexOf(char)] = null
            }
        })

    return result
}

    return (
        <div className="grid grid-rows-6 gap-2 p-2 w-full max-w-fit mx-auto">
            {rows.map((_, rowIndex) => {
                const isSubmitted = rowIndex < turn
                const isCurrent = rowIndex === turn
                
                let word = ""
                if (isSubmitted) word = guesses[rowIndex]
                else if (isCurrent) word = currentGuess

                const letters = word.padEnd(wordLength, " ").split("")
                const colors = isSubmitted ? getColors(word) : Array(wordLength).fill(styles.empty)
                return (
                    <div 
                        key={rowIndex} 
                        className="grid gap-2"
                        style={{ gridTemplateColumns : `repeat(${wordLength}, minmax(0, 1fr))` }}
                    >
                        {letters.map((char, colIndex) => {
                            const hasLetter = char !== " "
                            
                            // dark:bg-zinc-700 bg-zinc-200 
                            let baseStyle = "min-w-[3rem] border aspect-square flex items-center justify-center text-2xl sm:text-3xl font-bold text-black dark:text-white uppercase select-none transition-all duration-500"

                            let colorStyle = ""
                            if (isSubmitted) {
                                colorStyle = colors[colIndex]
                            } else if(isCurrent && hasLetter) {
                                colorStyle = "bg-transparent border-zinc-400 dark:border-zinc-600 text-black dark:text-white" 
                            } else {
                                colorStyle = styles.empty
                            }
                            return (
                                <div key={colIndex} className={`${baseStyle} ${colorStyle}`}>
                                    {hasLetter ? char : ""}
                                </div>
                            )
                        })}
                    </div>
                )
            })}
        </div>
    )
}