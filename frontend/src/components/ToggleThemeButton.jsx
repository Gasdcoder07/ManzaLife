import { IoMoon, IoSunny } from "react-icons/io5";
import { useTheme } from "../context/ThemeContext"

const ToggleThemeButton = () => {
    const { isDark, toggleTheme } = useTheme();

    return (
    <button 
        onClick={toggleTheme}
        className="p-2 rounded-full text-black md:text-white dark:text-white hover:text-orange-500 hover:scale-110 transition-all duration-200 ease-in-out cursor-pointer"
    >
        {isDark ? <IoSunny size={24} /> : <IoMoon size={24} />}
    </button>
  )
}

export default ToggleThemeButton