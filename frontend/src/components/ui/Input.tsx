import { LucideIcon } from "lucide-react";
import { UseFormRegisterReturn } from "react-hook-form";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label: string;
    icon: LucideIcon;
    error?: string;
    registration: UseFormRegisterReturn;
}

export function Input({ label, icon: Icon, error, registration, ...props }: InputProps) {
    return (
        <div>
            <label className="block text-sm font-medium mb-2 text-zinc-700 dark:text-zinc-400">
                {label}
            </label>
            <div className="relative">
                <Icon className="absolute left-3 top-3 h-5 w-5 text-zinc-400 dark:text-zinc-500" />
                <input
                    {...registration}
                    {...props}
                    className="w-full pl-10 pr-4 py-3 border rounded-lg outline-none transition-all
            bg-white border-zinc-300 text-zinc-900 placeholder:text-zinc-400
            focus:border-violet-500 focus:ring-1 focus:ring-violet-500
            dark:bg-zinc-950 dark:border-zinc-800 dark:text-white dark:placeholder:text-zinc-600 dark:focus:border-violet-600 dark:focus:ring-violet-600"
                />
            </div>
            {error && <span className="text-red-500 text-xs">{error}</span>}
        </div>
    );
}
