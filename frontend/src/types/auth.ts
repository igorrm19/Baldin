import { z } from "zod";

export const cadastroSchema = z.object({
    nome: z.string().min(3, "Nome muito curto"),
    email: z.string().email("Email inválido"),
    senha: z.string().min(6, "Senha deve ter 6+ caracteres"),
    cargo: z.string().min(1, "Selecione seu cargo"),
});

export type CadastroForm = z.infer<typeof cadastroSchema>;
