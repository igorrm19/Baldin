import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { cadastroSchema, CadastroForm } from '@/types/auth';
import { authService } from '@/services/authService';
import { useState } from 'react';

export function useRegisterForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const form = useForm<CadastroForm>({
    resolver: zodResolver(cadastroSchema),
  });

  async function aoSalvar(data: CadastroForm) {
    setIsLoading(true);
    setServerError(null);

    try {
      await authService.register({
        full_name: data.nome,
        email: data.email,
        password: data.senha,
        cargo: data.cargo,
      });

      alert(`Bem-vindo à Baldin Tech, ${data.nome}!`);
    } catch (error: unknown) {
      const err = error as { response?: { data?: { detail?: string } } };
      const msg =
        err?.response?.data?.detail || 'Erro ao cadastrar. Tente novamente.';
      setServerError(msg);
    } finally {
      setIsLoading(false);
    }
  }

  return {
    ...form,
    aoSalvar,
    isLoading,
    serverError,
  };
}
