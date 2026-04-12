import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { api } from "../../services/api";
import type { SignUpData } from "../../interfaces/signup-data";

const registerRequest = async (data: SignUpData) => {
  const response = await api.post(`/api/auth/register`, data);
  return response.data;
};

export const useSignUpForm = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  const registerMutation = useMutation({
    mutationFn: registerRequest,
    onSuccess: () => {
      navigate("/login");
    },
  });

  const validate = () => {
    const errors: Record<string, string> = {};

    if (name.trim().length < 3) {
      errors.name = "Nome deve ter pelo menos 3 caracteres.";
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errors.email = "Informe um e-mail válido.";
    }

    if (password.length < 6) {
      errors.password = "Senha deve ter pelo menos 6 caracteres.";
    }

    if (password !== confirmPassword) {
      errors.confirmPassword = "As senhas não coincidem.";
    }

    return errors;
  };

  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    const errors = validate();
    setFieldErrors(errors);

    if (Object.keys(errors).length > 0) return;

    registerMutation.mutate({ name, email, password });
  };

  return {
    name,
    email,
    password,
    confirmPassword,
    setName,
    setEmail,
    setPassword,
    setConfirmPassword,
    handleSubmit,
    isLoadingSignUp: registerMutation.isPending,
    isSuccess: registerMutation.isSuccess,
    error: registerMutation.isError
      ? "Erro ao criar conta. Verifique os dados e tente novamente."
      : null,
    fieldErrors,
  };
};
