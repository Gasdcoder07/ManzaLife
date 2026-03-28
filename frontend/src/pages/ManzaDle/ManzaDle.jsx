import { useState } from "react"
import { Navbar } from "../../components"

import Header from "./HeaderManzaDle"
import Board from "./Board"
import Keyboard from "./Keyboard"
import GameModal from "./GameModal"

export default function ManzaDle() {
    return (
        <div className="min-h-screen bg-linear-to-b from-zinc-950 to-orange-950 text-white flex flex-col font-sans">
            <Navbar />
            <div className="grow flex flex-col items-center pt-28 pb-8 px-4 w-full max-w-lg mx-auto relative">
                <Board />
            </div>
        </div>
    )
}