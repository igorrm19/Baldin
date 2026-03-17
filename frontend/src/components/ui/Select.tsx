import { LucideIcon } from "lucide-react";
import { UseFormRegisterReturn } from "react-hook-form";

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
    label: string;
    icon: LucideIcon;
    error?: string;
    registration: UseFormRegisterReturn;
    children: React.ReactNode;
}

export function Select({ label, icon: Icon, error, registration, children, ...props }: SelectProps) {
    return (
        <div>
            <label className="block text-sm font-medium mb-2 text-zinc-700 dark:text-zinc-400">
                {label}
            </label>
            <div className="relative">
                <Icon className="absolute left-3 top-3 h-5 w-5 text-zinc-400 dark:text-zinc-500" />
                <select
                    {...registration}
                    {...props}
                    className="w-full pl-10 pr-4 py-3 border rounded-lg outline-none transition-all appearance-none cursor-pointer
            bg-white border-zinc-300 text-zinc-900 
            focus:border-violet-500 focus:ring-1 focus:ring-violet-500
            dark:bg-zinc-950 dark:border-zinc-800 dark:text-white dark:focus:border-violet-600 dark:focus:ring-violet-600"
                >
                    {children}
                </select>
            </div>
            {error && <span className="text-red-500 text-xs">{error}</span>}
        </div>
    );
}
