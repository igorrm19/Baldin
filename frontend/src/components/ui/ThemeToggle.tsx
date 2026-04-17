import { Sun, Moon } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export function ThemeToggle() {
    const { setTheme, resolvedTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return <div className="p-6" />;
    }

    const toggleTheme = () => {
        setTheme(resolvedTheme === "dark" ? "light" : "dark");
    };

    return (
        <button
            onClick={toggleTheme}
            className="absolute top-5 right-5 p-3 rounded-full shadow-md hover:scale-110 transition-transform bg-white dark:bg-zinc-800 z-50"
            aria-label="Toggle theme"
        >
            {resolvedTheme === "dark" ? (
                <Sun className="h-6 w-6 text-yellow-400" />
            ) : (
                <Moon className="h-6 w-6 text-violet-600" />
            )}
        </button>
    );
}
