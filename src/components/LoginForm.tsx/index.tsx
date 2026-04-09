import { Box, TextField, Button } from "@mui/material";

export default function LoginForm() {
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

      <TextField label="Email" type="email" variant="outlined" fullWidth />

      <TextField label="Senha" type="password" variant="outlined" fullWidth />

      <Button variant="contained" size="large" sx={{ mt: 1 }}>
        Entrar
      </Button>
    </Box>
  );
}
