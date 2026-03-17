"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { User, Mail, Lock, Code2, Rocket, Sun, Moon } from "lucide-react";

const cadastroSchema = z.object({
  nome: z.string().min(3, "Nome muito curto"),
  email: z.string().email("Email inválido"),
  senha: z.string().min(6, "Senha deve ter 6+ caracteres"),
  cargo: z.string().min(1, "Selecione seu cargo"),
});

type CadastroForm = z.infer<typeof cadastroSchema>;

export default function CadastroPage() {
  const [temaEscuro, setTemaEscuro] = useState(true); // Começa true para testar o dark mode

  const { register, handleSubmit, formState: { errors } } = useForm<CadastroForm>({
    resolver: zodResolver(cadastroSchema),
  });

  function aoSalvar(data: CadastroForm) {
    console.log(data);
    alert("Bem-vindo à Baldin Tech, " + data.nome);
  }

  return (
    // DIV MESTRA
    <div className={temaEscuro ? "dark" : ""}>
      
      {/* FUNDO DA PÁGINA */}
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
            {/* Título responsivo: text-2xl (celular) -> md:text-3xl (PC) */}
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Junte-se ao Time</h1>
            <p className="mt-2 text-sm md:text-base text-zinc-500 dark:text-zinc-400">
              Crie sua conta para acessar as reuniões.
            </p>
          </div>

          <form onSubmit={handleSubmit(aoSalvar)} className="space-y-5 md:space-y-6">
            
            {/* CAMPO NOME */}
            <div>
              <label className="block text-sm font-medium mb-2 text-zinc-700 dark:text-zinc-400">Nome Completo</label>
              <div className="relative">
                <User className="absolute left-3 top-3 h-5 w-5 text-zinc-400 dark:text-zinc-500" />
                <input 
                  {...register("nome")}
                  type="text" 
                  placeholder="Seu nome"
                  className="w-full pl-10 pr-4 py-3 border rounded-lg outline-none transition-all
                    bg-white border-zinc-300 text-zinc-900 placeholder:text-zinc-400
                    focus:border-violet-500 focus:ring-1 focus:ring-violet-500
                    dark:bg-zinc-950 dark:border-zinc-800 dark:text-white dark:placeholder:text-zinc-600 dark:focus:border-violet-600 dark:focus:ring-violet-600"
                />
              </div>
              {errors.nome && <span className="text-red-500 text-xs">{errors.nome.message}</span>}
            </div>

            {/* CAMPO EMAIL */}
            <div>
              <label className="block text-sm font-medium mb-2 text-zinc-700 dark:text-zinc-400">E-mail Corporativo</label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-5 w-5 text-zinc-400 dark:text-zinc-500" />
                <input 
                  {...register("email")}
                  type="email" 
                  placeholder="dev@baldin.com"
                  className="w-full pl-10 pr-4 py-3 border rounded-lg outline-none transition-all
                    bg-white border-zinc-300 text-zinc-900 placeholder:text-zinc-400
                    focus:border-violet-500 focus:ring-1 focus:ring-violet-500
                    dark:bg-zinc-950 dark:border-zinc-800 dark:text-white dark:placeholder:text-zinc-600 dark:focus:border-violet-600 dark:focus:ring-violet-600"
                />
              </div>
              {errors.email && <span className="text-red-500 text-xs">{errors.email.message}</span>}
            </div>

            {/* CAMPO CARGO */}
            <div>
              <label className="block text-sm font-medium mb-2 text-zinc-700 dark:text-zinc-400">Função / Cargo</label>
              <div className="relative">
                <Code2 className="absolute left-3 top-3 h-5 w-5 text-zinc-400 dark:text-zinc-500" />
                <select 
                  {...register("cargo")}
                  className="w-full pl-10 pr-4 py-3 border rounded-lg outline-none transition-all appearance-none cursor-pointer
                    bg-white border-zinc-300 text-zinc-900 
                    focus:border-violet-500 focus:ring-1 focus:ring-violet-500
                    dark:bg-zinc-950 dark:border-zinc-800 dark:text-white dark:focus:border-violet-600 dark:focus:ring-violet-600"
                >
                  <option value="" className="text-zinc-500">Selecione sua função...</option>
                  <option value="frontend">Desenvolvedor Frontend</option>
                  <option value="backend">Desenvolvedor Backend</option>
                  <option value="design">Designer</option>
                </select>
              </div>
              {errors.cargo && <span className="text-red-500 text-xs">{errors.cargo.message}</span>}
            </div>

            {/* CAMPO SENHA */}
            <div>
              <label className="block text-sm font-medium mb-2 text-zinc-700 dark:text-zinc-400">Senha de Acesso</label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-5 w-5 text-zinc-400 dark:text-zinc-500" />
                <input 
                  {...register("senha")}
                  type="password" 
                  placeholder="••••••••"
                  className="w-full pl-10 pr-4 py-3 border rounded-lg outline-none transition-all
                    bg-white border-zinc-300 text-zinc-900 placeholder:text-zinc-400
                    focus:border-violet-500 focus:ring-1 focus:ring-violet-500
                    dark:bg-zinc-950 dark:border-zinc-800 dark:text-white dark:placeholder:text-zinc-600 dark:focus:border-violet-600 dark:focus:ring-violet-600"
                />
              </div>
              {errors.senha && <span className="text-red-500 text-xs">{errors.senha.message}</span>}
            </div>

            {/* BOTÃO CONFIRMAR */}
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

