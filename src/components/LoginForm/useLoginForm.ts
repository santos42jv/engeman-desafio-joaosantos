import { useState } from "react";
import { useUser } from "../../context/UserContext";
import { useNavigate } from "react-router-dom";

export const useLoginForm = () => {
  const { login, isLoadingLogin, isAuthenticated } = useUser();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.SubmitEvent) => {
    e.preventDefault();

    login(
      { email, password },
      {
        onSuccess: () => {
          navigate("/");
        },
      },
    );
  };

  return {
    email,
    password,
    setEmail,
    setPassword,
    handleSubmit,
    isLoadingLogin,
    isAuthenticated,
  };
};
