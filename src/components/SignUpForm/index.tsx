import { Box, TextField, Button, Alert } from "@mui/material";
import { useSignUpForm } from "./useSignUpForm";

export default function SignUpForm() {
  const { register, errors, handleSubmit, isLoadingSignUp, error } =
    useSignUpForm();

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
      {error && <Alert severity="error">{error}</Alert>}

      <TextField
        label="Nome Completo"
        type="text"
        fullWidth
        error={!!errors.name}
        helperText={errors.name?.message}
        {...register("name")}
      />

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

      <TextField
        label="Confirmar Senha"
        type="password"
        fullWidth
        error={!!errors.confirmPassword}
        helperText={errors.confirmPassword?.message}
        {...register("confirmPassword")}
      />

      <Button
        type="submit"
        variant="contained"
        size="large"
        sx={{ mt: 1 }}
        disabled={isLoadingSignUp}
      >
        {isLoadingSignUp ? "Cadastrando..." : "Cadastrar"}
      </Button>
    </Box>
  );
}
