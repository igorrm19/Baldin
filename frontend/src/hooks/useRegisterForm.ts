import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { cadastroSchema, CadastroForm } from "@/types/auth";

export function useRegisterForm() {
    const form = useForm<CadastroForm>({
        resolver: zodResolver(cadastroSchema),
    });

    const aoSalvar = (data: CadastroForm) => {
  console.log("Dados recebidos:", data);
};

    return {
        ...form,
        aoSalvar,
    };
}
