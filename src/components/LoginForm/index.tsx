import { Box, TextField, Button } from "@mui/material";
import { useLoginForm } from "./useLoginForm";

export default function LoginForm() {
  const {
    email,
    password,
    setEmail,
    setPassword,
    handleSubmit,
    isLoadingLogin,
  } = useLoginForm();

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        width: "100%",
        maxWidth: 400,
        display: "flex",
        flexDirection: "column",
        gap: 2,
      }}
    >
      <TextField
        label="Email"
        type="email"
        fullWidth
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <TextField
        label="Senha"
        type="password"
        fullWidth
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <Button
        type="submit"
        variant="contained"
        size="large"
        sx={{ mt: 1 }}
        disabled={isLoadingLogin}
      >
        {isLoadingLogin ? "Entrando..." : "Entrar"}
      </Button>
    </Box>
  );
}
