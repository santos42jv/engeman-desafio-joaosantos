import { Box, TextField, Button, Alert } from "@mui/material";
import { useSignUpForm } from "./useSignUpForm";

export default function SignUpForm() {
  const {
    name,
    email,
    password,
    confirmPassword,
    setName,
    setEmail,
    setPassword,
    setConfirmPassword,
    handleSubmit,
    isLoadingSignUp,
    error,
    fieldErrors,
  } = useSignUpForm();

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
        variant="outlined"
        fullWidth
        value={name}
        onChange={(e) => setName(e.target.value)}
        error={!!fieldErrors.name}
        helperText={fieldErrors.name}
      />

      <TextField
        label="Email"
        type="email"
        variant="outlined"
        fullWidth
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        error={!!fieldErrors.email}
        helperText={fieldErrors.email}
      />

      <TextField
        label="Senha"
        type="password"
        variant="outlined"
        fullWidth
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        error={!!fieldErrors.password}
        helperText={fieldErrors.password}
      />

      <TextField
        label="Confirmar Senha"
        type="password"
        variant="outlined"
        fullWidth
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        error={!!fieldErrors.confirmPassword}
        helperText={fieldErrors.confirmPassword}
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