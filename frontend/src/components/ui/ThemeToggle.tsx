import { Sun, Moon } from "lucide-react";

interface ThemeToggleProps {
    isDark: boolean;
    onToggle: () => void;
}

export function ThemeToggle({ isDark, onToggle }: ThemeToggleProps) {
    return (
        <button
            onClick={onToggle}
            className="absolute top-5 right-5 p-3 rounded-full shadow-md hover:scale-110 transition-transform bg-white dark:bg-zinc-800 z-50"
        >
            {isDark ? <Sun className="h-6 w-6 text-yellow-400" /> : <Moon className="h-6 w-6 text-violet-600" />}
        </button>
    );
}
