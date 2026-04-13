import { Box, TextField, Button } from "@mui/material";
import { useLoginForm } from "./useLoginForm";

export default function LoginForm() {
  const { register, errors, handleSubmit, isLoadingLogin } = useLoginForm();

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
        error={!!errors.email}
        helperText={errors.email?.message}
        {...register("email")}
      />

      <TextField
        label="Senha"
        type="password"
        fullWidth
        error={!!errors.password}
        helperText={errors.password?.message}
        {...register("password")}
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
