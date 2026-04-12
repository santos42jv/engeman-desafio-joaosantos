import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { loginRequest, getMe } from "../services/auth";
import type { LoginData } from "../Interfaces/auth-data";

const USER_STORAGE_KEY = "user";

const saveUser = (user: unknown) =>
  localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user));

const loadUser = () => {
  try {
    const raw = localStorage.getItem(USER_STORAGE_KEY);
    return raw ? JSON.parse(raw) : undefined;
  } catch {
    return undefined;
  }
};

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
    queryFn: async () => {
      const user = await getMe();
      saveUser(user);
      return user;
    },
    enabled: hasToken,
    retry: false,
    staleTime: 1000 * 60 * 5,
    initialData: loadUser,
  });

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem(USER_STORAGE_KEY);
    queryClient.removeQueries({ queryKey: ["me"] });
  };

  const isLoadingUser = hasToken && userQuery.isLoading;

  return {
    login: loginMutation.mutate,
    isLoadingLogin: loginMutation.isPending,

    user: userQuery.data,
    isAuthenticated: !!userQuery.data,
    isLoadingUser,
    logout,
  };
};
