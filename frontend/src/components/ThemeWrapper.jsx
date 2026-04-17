import { useTheme } from "../context/ThemeContext";

function ThemeWrapper({ children }){
    const { isDark } = useTheme();

    return (
        <div className={`${isDark ? "dark" : ""} min-h-screen bg-white dark:bg-zinc-950 transition-colors duration-300`}>
            {children}
        </div>
    );
}

export default ThemeWrapper;