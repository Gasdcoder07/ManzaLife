import { useState, useEffect, useRef } from "react"
import { DICTIONARY } from "../../../utils/manzadleWords"
import { Navbar } from "../../components"
import Header from "./HeaderManzaDle"
import Board from "./Board"
import Keyboard from "./Keyboard"
import GameModal from "./GameModal"
import InfoModal from "./InfoModal"
import ManzaDleNavBar from "./ManzaDleNavBar"
import { useAuth } from "../../context/AuthContext"
import { useNavigate } from "react-router"
import LoginBtn from "../../components/LoginBtn/LoginBtn"
import { registrarResultado, consultarResultado } from "../../services/ManzaDleService"

const STORAGE_KEY = "manzadle-status"

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
    const { user } = useAuth()
    const navigate = useNavigate()
    const justFinished = useRef(false)
    const finishedThisSession = useRef(false)

    useEffect(() => {
        if (user && user.is_banned) {
            navigate("/403")
        }
    }, [user, navigate])

    const [isGameOver, setIsGameOver] = useState(() => {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) {
            const { completed, date } = JSON.parse(saved);
            const today = new Date().toLocaleDateString('en-CA');
            return date === today && completed;
        }
        return false;
    });

    const [isWin, setIsWin] = useState(() => {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) {
            const { status, date } = JSON.parse(saved);
            const today = new Date().toLocaleDateString('en-CA');
            return date === today && status === "win";
        }
        return false;
    });

    useEffect(() => {
        if (!user) return
        consultarResultado()
            .then(({ data }) => {
                if (data.played_today) {
                    setIsGameOver(true)
                    setIsWin(data.last_result === "win")
                }
            })
            .catch(console.error)
    }, [user])

    const [showInfo, setShowInfo] = useState(false)

    const solution = solutionData.word
    const description = solutionData.desc

    const handleKeyPress = (key) => {
        if (isGameOver) return
        if (!user) return

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
                justFinished.current = true
                finishedThisSession.current = true
                setIsGameOver(true)
            } else if (turn === 5) {
                justFinished.current = false
                finishedThisSession.current = true
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

    useEffect(() => {
        if (isGameOver && finishedThisSession.current) {
            registrarResultado(isWin ? "win" : "loss").catch(console.error)
        }
    }, [isGameOver])

    return (
        <div className="min-h-screen bg-linear-to-b from-[#fcfcfc] to-[#f5f5f7] dark:from-[#0d0d0f] dark:to-orange-950 text-white flex flex-col font-sans">
            <ManzaDleNavBar />
            {!user && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/40 dark:bg-black/60 backdrop-blur-md px-4">
                    <div className="dark:bg-zinc-900/50 bg-white max-w-md m-auto p-8 rounded-2xl border-orange-500 border-2 shadow-2xl backdrop-blur-sm flex flex-col items-center text-center gap-6">
                        <div className="w-16 h-16 bg-orange-100 dark:bg-orange-500/10 text-orange-500 flex items-center justify-center rounded-full text-3xl shadow-inner">
                            🔒
                        </div>
                        <div className="space-y-2">
                            <h1 className="text-2xl md:text-3xl font-bold text-zinc-800 dark:text-white tracking-tight">
                                ¡Lo sentimos!
                            </h1>
                            <p className="text-zinc-500 dark:text-zinc-400 leading-relaxed">
                                Para poder disfrutar de <span className="font-semibold text-orange-500 dark:text-orange-400">ManzaDle</span>, necesitas iniciar sesión :)
                            </p>
                        </div>
                        <LoginBtn />
                    </div>
                </div>
                )
            }
            <main className="grow flex flex-col items-center pt-20 pb-8 px-4 w-full max-w-lg mx-auto relative">
                <Header onOpenInfo={() => setShowInfo(true)}/>
                {showInfo && (<InfoModal onClose={() => setShowInfo(false)}/>)}
                <div className="w-full grow flex flex-col justify-center items-center mb-6">
                    {!isGameOver && !isWin ? (
                        <Board guesses={guesses} currentGuess={currentGuess} turn={turn} solution={solution} />
                    ) : (
                        <div className="flex flex-col items-center justify-center p-6 dark:bg-zinc-900/50 bg-white rounded-2xl border border-white/10 text-center animate-fade-in shadow-xl">
                            {isWin ? (
                                <div>
                                  <h2 className="text-3xl font-bold text-green-400 mb-2 drop-shadow-md">¡Adivinaste!</h2>
                                  <p className="dark:text-zinc-300 text-zinc-400">Eres un máster, mañana habrá una nueva palabra</p>
                                </div>
                            ) : (
                                <div>
                                  <h2 className="text-3xl font-bold text-red-500 mb-2 drop-shadow-md">Game Over</h2>
                                  <p className="text-zinc-300 text-lg">La palabra era: <span className="font-bold text-white">{solution}</span></p>
                                </div>
                            )}
                        </div>
                    )}
                </div>
                <div className="w-full min-h-50 flex flex-col justify-center">
                    {!isGameOver && (
                        <Keyboard onKeyPress={handleKeyPress} />
                    )}
                </div>

                {isGameOver && (
                    <GameModal isWin={isWin} secretWord={solution} description={description}/>
                )}
            </main>
        </div>
    )
}
