import { IoMoon, IoSunny } from "react-icons/io5";
import { useTheme } from "../context/ThemeContext"

const ToggleThemeButton = ({ isNavbar = false, isBlog = false, isManzaDle = false, isMenuMobile = false}) => {
    const { isDark, toggleTheme } = useTheme();
    let styles = "";

    if (isNavbar) {
        styles = "text-black dark:text-white md:text-white hover:text-orange-600";
    } else if (isBlog) {
        styles = "text-black dark:text-white hover:text-orange-600";
    } else if (isManzaDle) {
        styles = "text-orange-600";
    } else if (isMenuMobile) {
        styles = "text-white hover:text-orange-600";
    }

    return (
    <button 
        onClick={toggleTheme}
        className={`${styles} p-2 rounded-full hover-scale-110 transition-all duration-200 ease-in-out cursor-pointer`}
    >
        {isDark ? <IoSunny size={24} /> : <IoMoon size={24}/>}
    </button>
  )
}

export default ToggleThemeButton