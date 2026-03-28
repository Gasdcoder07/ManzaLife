import { useState } from "react"
import { Navbar } from "../../components"

import Header from "./HeaderManzaDle"

export default function ManzaDle() {
    return (
        <div className="min-h-screen bg-linear-to-b from-zinc-950 to-orange-900 text-white flex flex-col font-sans">
            <Navbar />
        </div>
    )
}