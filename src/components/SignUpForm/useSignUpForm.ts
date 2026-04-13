import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation } from "@tanstack/react-query";
import { api } from "../../services/api";

const signUpSchema = z
  .object({
    name: z.string().min(3, "Nome deve ter pelo menos 3 caracteres.").max(100),
    email: z.string().email("Informe um e-mail válido."),
    password: z.string().min(6, "Senha deve ter pelo menos 6 caracteres."),
    confirmPassword: z.string().min(1, "Confirme sua senha."),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "As senhas não coincidem.",
    path: ["confirmPassword"],
  });

type SignUpFormData = z.infer<typeof signUpSchema>;

export const useSignUpForm = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpFormData>({
    resolver: zodResolver(signUpSchema),
  });

  const { mutate, isPending, isError } = useMutation({
    mutationFn: (data: Omit<SignUpFormData, "confirmPassword">) =>
      api.post("/api/auth/register", data),
    onSuccess: () => navigate("/login"),
  });

  const onSubmit = ({ confirmPassword: _, ...data }: SignUpFormData) => {
    mutate(data);
  };

  return {
    register,
    errors,
    handleSubmit: handleSubmit(onSubmit),
    isLoadingSignUp: isPending,
    error: isError
      ? "Erro ao criar conta. Verifique os dados e tente novamente."
      : null,
  };
};
