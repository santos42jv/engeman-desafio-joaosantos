import {
  FullImage,
  LoginFormContainer,
  LoginFormSubtitle,
  LoginFormTitle,
  LoginFormTitleStrong,
  LoginSection,
  LoginSectionLeft,
  LoginSectionRight,
} from "./style";
import LoginForm from "../../components/LoginForm/index.tsx";
import build from "../../assets/login-page-image.jpg";
import { Box, Typography } from "@mui/material";
import { Link } from "react-router-dom";

export default function Login() {
  return (
    <LoginSection>
      <LoginSectionLeft>
        <LoginFormContainer>
          <Box
            component="div"
            sx={{ display: "flex", flexDirection: "column", marginBottom: 4 }}
          >
            <LoginFormTitle>Bem vindo ao</LoginFormTitle>

            <LoginFormTitle>
              Portal <LoginFormTitleStrong>KeySpace</LoginFormTitleStrong>
            </LoginFormTitle>

            <LoginFormSubtitle>
              gerencie imóveis com facilidade
            </LoginFormSubtitle>
          </Box>
          <LoginForm />
        </LoginFormContainer>
        <Typography
          sx={{
            mt: 2,
            color: "gray",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          não tem uma conta?{" "}
          <Typography
            component={Link}
            to="/cadastro"
            color="secondary"
            sx={{
              fontWeight: 600,
              fontSize: "1rem",
              "&:hover": {
                textDecoration: "underline",
              },
            }}
          >
            cadastre-se
          </Typography>
        </Typography>
      </LoginSectionLeft>
      <LoginSectionRight>
        <FullImage src={build} alt="login-page-image" />;
      </LoginSectionRight>
    </LoginSection>
  );
}
