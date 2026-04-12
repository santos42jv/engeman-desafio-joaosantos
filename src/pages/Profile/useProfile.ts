import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../../services/api";
import type { UserData, UpdateProfilePayload } from "../../interfaces/user-data";

const getMe = async (): Promise<UserData> => {
  const { data } = await api.get("/api/user");
  return data;
};

const updateMe = async (payload: UpdateProfilePayload): Promise<UserData> => {
  const { data } = await api.put("/api/user/update", payload);
  return data;
};

export const useProfile = () => {
  const queryClient = useQueryClient();

  const { data: user, isLoading } = useQuery({
    queryKey: ["me"],
    queryFn: getMe,
  });

  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [formError, setFormError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const { mutate: update, isPending: isUpdating } = useMutation({
    mutationFn: updateMe,
    onSuccess: (updated) => {
      queryClient.setQueryData(["me"], updated);
      setPassword("");
      setConfirmPassword("");
      setFormError("");
      setSuccessMessage("Perfil atualizado com sucesso!");
      setTimeout(() => setSuccessMessage(""), 4000);
    },
    onError: () => {
      setFormError("Erro ao atualizar perfil. Tente novamente.");
    },
  });

  const handleSubmit = (e: React.SubmitEvent) => {
    e.preventDefault();
    setFormError("");
    setSuccessMessage("");

    if (password && password.length < 6) {
      setFormError("A senha deve ter no mínimo 6 caracteres.");
      return;
    }

    if (password && password !== confirmPassword) {
      setFormError("As senhas não coincidem.");
      return;
    }

    const payload: UpdateProfilePayload = {};
    if (name.trim()) payload.name = name.trim();
    if (password) payload.password = password;

    if (!payload.name && !payload.password) {
      setFormError("Preencha ao menos um campo para atualizar.");
      return;
    }

    update(payload);
  };

  return {
    user,
    isLoading,
    name,
    setName,
    password,
    setPassword,
    confirmPassword,
    setConfirmPassword,
    formError,
    successMessage,
    isUpdating,
    handleSubmit,
  };
};
