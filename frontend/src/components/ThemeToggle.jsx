import { useTheme } from "../theme/ThemeContext.jsx";

const ThemeToggle = () => {
    const { isDarkMode, toggleTheme } = useTheme();

    return (
        <button
            type="button"
            onClick={toggleTheme}
            className="pixel-font border-4 border-slate-950 bg-blue-300 px-4 py-3 text-xs font-black uppercase text-slate-950 shadow-[4px_4px_0_#020617] transition-all hover:translate-x-1 hover:translate-y-1 hover:shadow-none dark:border-white dark:bg-slate-800 dark:text-white dark:shadow-[4px_4px_0_#ffffff]"
        >
            {isDarkMode ? "Light" : "Dark"}
        </button>
    );
};


export default ThemeToggle;