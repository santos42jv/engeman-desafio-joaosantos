import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { loginRequest, getMe } from "../services/auth";
import type { LoginData } from "../Interfaces/auth-data";

export const useAuth = () => {
  const queryClient = useQueryClient();
  const hasToken = !!localStorage.getItem("token");

  const loginMutation = useMutation({
    mutationFn: ({ email, password }: LoginData) =>
      loginRequest(email, password),

    onSuccess: (data) => {
      localStorage.setItem("token", data.token);
      queryClient.invalidateQueries({ queryKey: ["me"] });
    },
  });

  const userQuery = useQuery({
    queryKey: ["me"],
    queryFn: getMe,
    enabled: !!localStorage.getItem("token"),
  });

  const logout = () => {
    localStorage.removeItem("token");
    queryClient.removeQueries({ queryKey: ["me"] });
  };

  return {
    login: loginMutation.mutate,
    isLoadingLogin: loginMutation.isPending,

    user: userQuery.data,
    isAuthenticated: !!userQuery.data,
    isLoadingUser: hasToken && userQuery.isLoading,
    logout,
  };
};
