import {
  FullImage,
  SignupFormContainer,
  SignupFormSubtitle,
  SignupFormTitle,
  SignupFormTitleStrong,
  SignupSection,
  SignupSectionLeft,
  SignupSectionRight,
} from "./style";
import SignupForm from "../../components/SignUpForm";
import build from "../../assets/login-page-image.jpg";
import { Box, Typography } from "@mui/material";
import { Link } from "react-router-dom";

export default function Signup() {
  return (
    <SignupSection>
      <SignupSectionLeft>
        <SignupFormContainer>
          <Box
            component="div"
            sx={{ display: "flex", flexDirection: "column", marginBottom: 4 }}
          >
            <SignupFormTitle>Cadastre-se no</SignupFormTitle>

            <SignupFormTitle>
              Portal <SignupFormTitleStrong>KeySpace</SignupFormTitleStrong>
            </SignupFormTitle>

            <SignupFormSubtitle>preencha os dados abaixo</SignupFormSubtitle>
          </Box>
          <SignupForm />

          <Box component="div" sx={{ display: "flex", flexDirection: "column", alignItems: "center", width: "100%" }}>
            <Typography
              sx={{
                mt: 2,
                color: "gray",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              já tem uma conta?{" "}
              <Typography
                component={Link}
                to="/login"
                color="secondary"
                sx={{
                  fontWeight: 600,
                  fontSize: "1rem",
                  "&:hover": {
                    textDecoration: "underline",
                  },
                }}
              >
                entrar
              </Typography>
            </Typography>
          </Box>
        </SignupFormContainer>
      </SignupSectionLeft>
      <SignupSectionRight>
        <FullImage src={build} alt="signup-page-image" />
      </SignupSectionRight>
    </SignupSection>
  );
}
