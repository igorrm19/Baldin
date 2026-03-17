"use client";

import { useState } from "react";
import { User, Mail, Lock, Code2, Rocket, Sun, Moon } from "lucide-react";
import { useRegisterForm } from "@/hooks/useRegisterForm";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { ThemeToggle } from "@/components/ui/ThemeToggle";

export default function CadastroPage() {
  const [temaEscuro, setTemaEscuro] = useState(true);
  const { register, handleSubmit, formState: { errors }, aoSalvar } = useRegisterForm();

  return (
    <div className={temaEscuro ? "dark" : ""}>
      <div className="min-h-screen flex items-center justify-center p-4 transition-colors duration-300 bg-zinc-50 text-zinc-900 dark:bg-zinc-950 dark:text-zinc-100">
        
        {/* BOTÃO FLUTUANTE (SOL / LUA) */}
        <button 
        type="button"
          onClick={() => setTemaEscuro(!temaEscuro)}
          className="absolute top-5 right-5 p-3 rounded-full shadow-md hover:scale-110 transition-transform bg-white dark:bg-zinc-800 z-50"
        >
          {temaEscuro ? <Sun className="h-6 w-6 text-yellow-400" /> : <Moon className="h-6 w-6 text-violet-600" />}
        </button>

        {/* --- CARTÃO DO FORMULÁRIO (RESPONSIVO) --- */}
        {/* w-full: Ocupa a largura disponível 
            max-w-md: No celular/tablet, trava em tamanho médio
            md:max-w-lg: No Desktop (md+), permite ficar um pouco mais largo
            p-6: Padding menor no celular
            md:p-10: Padding bem espaçoso no Desktop
        */}
        <div className="w-full max-w-md md:max-w-lg rounded-xl shadow-2xl p-6 md:p-10 border transition-colors duration-300 bg-white border-zinc-200 dark:bg-zinc-900 dark:border-zinc-800">

          {/* CABEÇALHO */}
          <div className="text-center mb-8 md:mb-10">
            <div className="flex justify-center mb-4">
              <div className="h-14 w-14 md:h-16 md:w-16 rounded-full flex items-center justify-center shadow-lg transition-colors bg-violet-500 shadow-violet-500/30 dark:bg-violet-600 dark:shadow-violet-600/50">
                <Rocket className="h-7 w-7 md:h-8 md:w-8 text-white" />
              </div>
            </div>
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Junte-se ao Time</h1>
            <p className="mt-2 text-sm md:text-base text-zinc-500 dark:text-zinc-400">
              Crie sua conta para acessar as reuniões.
            </p>
          </div>

          <form onSubmit={handleSubmit(aoSalvar)} className="space-y-5 md:space-y-6">

            <Input
              label="Nome Completo"
              icon={User}
              placeholder="Seu nome"
              registration={register("nome")}
              error={errors.nome?.message}
            />

            <Input
              label="E-mail Corporativo"
              icon={Mail}
              type="email"
              placeholder="dev@baldin.com"
              registration={register("email")}
              error={errors.email?.message}
            />

            <Select
              label="Função / Cargo"
              icon={Code2}
              registration={register("cargo")}
              error={errors.cargo?.message}
            >
              <option value="" className="text-zinc-500">Selecione sua função...</option>
              <option value="frontend">Desenvolvedor Frontend</option>
              <option value="backend">Desenvolvedor Backend</option>
              <option value="design">Designer</option>
            </Select>

            <Input
              label="Senha de Acesso"
              icon={Lock}
              type="password"
              placeholder="••••••••"
              registration={register("senha")}
              error={errors.senha?.message}
            />

            <button
              type="submit"
              className="w-full font-bold py-3 rounded-lg shadow-lg transition-all active:scale-95 text-white
                bg-violet-500 hover:bg-violet-600 shadow-violet-500/20
                dark:bg-violet-600 dark:hover:bg-violet-700 dark:shadow-violet-900/20"
            >
              Confirmar Cadastro
            </button>

            <p className="text-center text-sm mt-4 text-zinc-600 dark:text-zinc-500">
              Já tem acesso? <a href="#" className="hover:underline text-violet-500 dark:text-violet-400">Entrar no Painel</a>
            </p>

          </form>
        </div>
      </div>
    </div>
  );
} 

