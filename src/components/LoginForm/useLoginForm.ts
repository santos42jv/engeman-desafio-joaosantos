import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useUser } from "../../context/UserContext";

const loginSchema = z.object({
  email: z
    .string()
    .email("Informe um e-mail válido.")
    .min(1, "E-mail é obrigatório."),
  password: z.string().min(1, "Senha é obrigatória."),
});

type LoginFormData = z.infer<typeof loginSchema>;

export const useLoginForm = () => {
  const { login, isLoadingLogin } = useUser();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = (data: LoginFormData) => {
    login(data, {
      onSuccess: () => navigate("/"),
    });
  };

  return {
    register,
    errors,
    handleSubmit: handleSubmit(onSubmit),
    isLoadingLogin,
  };
};
