import { useState, useEffect } from "react"
import { DICTIONARY } from "../../../utils/manzadleWords"
import { Navbar } from "../../components"
import Header from "./HeaderManzaDle"
import Board from "./Board"
import Keyboard from "./Keyboard"
import GameModal from "./GameModal"

const getDailyWord = () => {
    const today = new Date()
    const dateSeed = today.getFullYear() * 10000 + (today.getMonth() + 1) * 100 + today.getDate()

    const index = dateSeed % DICTIONARY.length
    return DICTIONARY[index];
}

export default function ManzaDle() {

    const [solutionData, setSolutionData] = useState(getDailyWord())
    const [guesses, setGuesses] = useState(Array(6).fill(null))
    const [currentGuess, setCurrentGuess] = useState("")
    const [turn, setTurn] = useState(0)
    const [isGameOver, setIsGameOver] = useState(false)
    const [isWin, setIsWin] = useState(false)

    const solution = solutionData.word
    const description = solutionData.desc

    const handleKeyPress = (key) => {
        if (isGameOver) return

        if (key === 'BACKSPACE' || key === 'Backspace' || key === 'DELETE') {
            setCurrentGuess((prev) => prev.slice(0, -1))
            return
        }

        if (key === 'ENTER' || key === 'Enter') {
            if (currentGuess.length !== solution.length) return

            const newGuesses = [...guesses]
            newGuesses[turn] = currentGuess
            setGuesses(newGuesses)

            if (currentGuess === solution) {
                setIsWin(true)
                setIsGameOver(true)
            } else if (turn === 5) {
                setIsGameOver(true)
            }

            setTurn(turn + 1)
            setCurrentGuess("")
            return
        }

        if (/^[A-Za-zÑñ]$/.test(key)) {
            if (currentGuess.length < solution.length) {
                setCurrentGuess((prev) => prev + key.toUpperCase())
            }
        }
    }

    useEffect(() => {
        const handleKeyDown = (e) => handleKeyPress(e.key)
        window.addEventListener('keydown', handleKeyDown)
        return () => window.removeEventListener('keydown', handleKeyDown)
    }, [currentGuess, turn, isGameOver])

    return (
        <div className="min-h-screen bg-linear-to-b from-zinc-950 to-orange-950 text-white flex flex-col font-sans">
            <Navbar />
            <main className="grow flex flex-col items-center pt-28 pb-8 px-4 w-full max-w-lg mx-auto relative">
                <Header />
                <div className="w-full grow flex flex-col justify-center items-center mb-6">
                    <Board guesses={guesses} currentGuess={currentGuess} turn={turn} solution={solution} />
                </div>
                
                <div className="w-full min-h-[200px] flex flex-col justify-center">
                    {!isGameOver ? (
                        <Keyboard onKeyPress={handleKeyPress} />
                    ) : (
                        <div className="flex flex-col items-center justify-center p-6 bg-zinc-900/50 rounded-2xl border border-white/10 text-center animate-fade-in backdrop-blur-md">
                            {isWin ? (
                                <>
                                  <h2 className="text-3xl font-bold text-green-400 mb-2 drop-shadow-md">¡Adivinaste!</h2>
                                  <p className="text-zinc-300">Eres un máster, mañana habrá una nueva palabra</p>
                                </>
                            ) : (
                                <>
                                  <h2 className="text-3xl font-bold text-red-500 mb-2 drop-shadow-md">Game Over</h2>
                                  <p className="text-zinc-300 text-lg">La palabra era: <span className="font-bold text-white">{solution}</span></p>
                                </>
                            )}
                        </div>
                    )}
                </div>

                {isGameOver && (
                    <GameModal isWin={isWin} secretWord={solution} description={description}/>
                )}
            </main>
        </div>
    )
}
