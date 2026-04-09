import { Box, TextField, Button } from "@mui/material";

export default function SignUpForm() {
  return (
    <Box
      component="form"
      sx={{
        width: "100%",
        maxWidth: 400,
        display: "flex",
        flexDirection: "column",
        gap: 2,
      }}
    >

      <TextField label="Nome Completo" type="text" variant="outlined" fullWidth />

      <TextField label="Email" type="email" variant="outlined" fullWidth />

      <TextField label="Senha" type="password" variant="outlined" fullWidth />

      <TextField label="Confirmar Senha" type="password" variant="outlined" fullWidth />

      <Button variant="contained" size="large" sx={{ mt: 1 }}>
        Cadastrar
      </Button>
    </Box>
  );
}
