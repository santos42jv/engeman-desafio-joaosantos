import axios from "axios";

const API_URL = "https://d-engeman-1.onrender.com";

export const loginRequest = async (email: string, password: string) => {
  const response = await axios.post(`${API_URL}/api/auth/login`, {
    email,
    password,
  });

  return response.data;
};

export const getMe = async () => {
  const token = localStorage.getItem("token");

  const response = await axios.get(`${API_URL}/api/user`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};
