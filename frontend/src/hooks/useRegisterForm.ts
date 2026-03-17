import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { cadastroSchema, CadastroForm } from "@/types/auth";

export function useRegisterForm() {
    const form = useForm<CadastroForm>({
        resolver: zodResolver(cadastroSchema),
    });

    function aoSalvar(data: CadastroForm) {
        console.log(data);
        alert("Bem-vindo à Baldin Tech, " + data.nome);
    }

    return {
        ...form,
        aoSalvar,
    };
}
