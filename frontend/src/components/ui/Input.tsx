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
    <div className="space-y-2">
      <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-400">
        {label}
      </label>
      <div className="relative">
        <Icon className="absolute left-3 top-3 h-5 w-5 text-zinc-400" />
        <input
          {...registration}
          {...props} // Isso aqui libera o type="password", name, placeholder, etc.
          className={`w-full pl-10 pr-4 py-2 rounded-lg border bg-white dark:bg-zinc-800 transition-colors
            ${error ? "border-red-500" : "border-zinc-200 dark:border-zinc-700"}
            focus:outline-none focus:ring-2 focus:ring-violet-500`}
        />
      </div>
      {error && <span className="text-xs text-red-500">{error}</span>}
    </div>
  );
}
