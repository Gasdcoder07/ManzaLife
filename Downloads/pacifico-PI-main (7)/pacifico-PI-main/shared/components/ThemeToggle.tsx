"Use client";

import { useEffect, useState } from "react";

export default function ThemeToggle() {
    const [dark, setDark] = useState(false);

    useEffect(() => {
        const saved = localStorage.getItem("theme");

        const isDark = saved === "dark" || 
            (!saved && window.matchMedia("(prefers-color-scheme: dark)").matches);


        setDark(isDark);
        document.documentElement.classList.toggle("dark", isDark);
        document.documentElement.style.colorScheme = isDark ? "dark" : "light";
    }, []);

    function cambiarTema() {
        const nuevoTema = !dark;
        
        setDark(nuevoTema)
        document.documentElement.classList.toggle("dark", nuevoTema);
        document.documentElement.style.colorScheme = nuevoTema ? "dark" : "light";

        localStorage.setItem("theme", nuevoTema ? "dark" : "light");
    }

    return (
        <button
        type="button"
        onClick={cambiarTema}
        className="rounded-lg border-natural-300 bg-white px-3 py-2 text-neutral-800 dark:border-neutral-600 dark:bg-neutral-800 dark:text-white"
        >
            {dark ? "Switch to Light Mode" : "Switch to Dark Mode"}
        </button>
    )
}