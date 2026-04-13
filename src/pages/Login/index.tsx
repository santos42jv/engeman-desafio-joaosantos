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
import LoginForm from "../../components/LoginForm";
import build from "../../assets/login-page-image.jpg";
import { Box, Typography } from "@mui/material";
import { Link } from "react-router-dom";

export default function Login() {
  return (
    <LoginSection>
      <LoginSectionLeft>
        <LoginFormContainer>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              marginBottom: 4,
              width: "100%",
              alignItems: "flex-start",
            }}
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

          <Typography
            sx={{
              mt: 2,
              color: "gray",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              width: "100%",
            }}
          >
            não tem uma conta?
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
        </LoginFormContainer>
      </LoginSectionLeft>

      <LoginSectionRight>
        <FullImage src={build} alt="login-page-image" />
      </LoginSectionRight>
    </LoginSection>
  );
}
