import { Box, styled, Typography } from "@mui/material";

export const LoginSection = styled("section")({
  display: "flex",
  alignItems: "center",
  height: "100vh",
  width: "100vw",
  overflow: "hidden",
});

export const LoginSectionLeft = styled("section")({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: "50vw",
  height: "100vh",
  backgroundColor: "#f1f5fb",
});

export const LoginFormContainer = styled(Box)({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  width: "100%",
  maxWidth: "400px", // 👈 controle real de largura
  padding: "32px",
  borderRadius: "16px",
  backgroundColor: "#fff",
  boxShadow: "0 8px 24px rgba(0,0,0,0.05)", // 👈 polimento visual
});

export const LoginFormTitle = styled(Typography)({
  fontFamily: "Roboto, sans-serif",
  fontSize: "2rem",
  fontWeight: "bold",
  color: "#2e4490",
});

export const LoginFormTitleStrong = styled("strong")({
  fontFamily: "Roboto, sans-serif",
  fontSize: "2rem",
  fontWeight: "bold",
  color: "#ee5f3d",
  marginLeft: "0.75rem",
});

export const LoginFormSubtitle = styled(Typography)({
  fontFamily: "Roboto, sans-serif",
  fontSize: "1.2rem",
  color: "gray",
});

export const LoginSectionRight = styled("section")({
  width: "50%",
  height: "100%",
});

export const FullImage = styled("img")({
  width: "100%",
  height: "100%",
  objectFit: "cover",
});
