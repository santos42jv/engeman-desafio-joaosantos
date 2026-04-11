import { Box, styled, Typography } from "@mui/material";

export const SignupSection = styled(
  "section",
  {},
)({
  display: "flex",
  alignItems: "center",
  height: "100vh",
  width: "100vw",
  overflow: "hidden",
});

export const SignupSectionLeft = styled(
  "section",
  {},
)({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  width: "50vw",
  height: "100vh",
  gap: "1rem",
  backgroundColor: "#f1f5fb",
});

export const SignupFormContainer = styled(
  Box,
  {},
)({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "flex-start",
   width: '50%',
});

export const SignupFormTitle = styled(
  Typography,
  {},
)({
  display: "flex",
  fontFamily: "Roboto, sans-serif",
  fontSize: "2rem",
  fontWeight: "bold",
  color: "#2e4490",
});

export const SignupFormTitleStrong = styled(
  "strong",
  {},
)({
  fontFamily: "Roboto, sans-serif",
  fontSize: "2rem",
  fontWeight: "bold",
  color: "#ee5f3d",
  marginLeft: "0.75rem",
});

export const SignupFormSubtitle = styled(
  Typography,
  {},
)({
  fontFamily: "Roboto, sans-serif",
  fontSize: "1.5rem",
  fontWeight: "normal",
  color: "gray",
});

export const SignupSectionRight = styled(
  "section",
  {},
)({
  width: "50%",
  height: "100%",
});

export const FullImage = styled("img")({
  width: "100%",
  height: "100%",
  objectFit: "cover",
});
