import { api } from "./api";

export const loginRequest = async (email: string, password: string) => {
  const response = await api.post(`/api/auth/login`, {
    email,
    password,
  });

  return response.data;
};

export const getMe = async () => {
  const token = localStorage.getItem("token");

  const response = await api.get(`/api/user`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};
