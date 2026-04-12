import { Box, styled, Typography, Divider } from "@mui/material";

export const ProfileSection = styled(Box)({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  width: "100%",
  minHeight: "calc(100vh - 64px)",
  padding: "2.5rem 1.5rem",
  boxSizing: "border-box",
  backgroundColor: "#f5f7fb",
});

export const ProfileCard = styled(Box)({
  display: "flex",
  flexDirection: "column",
  width: "100%",
  maxWidth: 560,
  backgroundColor: "#fff",
  borderRadius: 16,
  border: "1px solid #e0e0e0",
  overflow: "hidden",
});

export const ProfileCardHeader = styled(Box)({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: "2rem 1.5rem 1.5rem",
  gap: "0.75rem",
  backgroundColor: "#f5f7fb",
});

export const ProfileAvatar = styled(Box)({
  width: 72,
  height: 72,
  borderRadius: "50%",
  backgroundColor: "#2e4490",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: "1.75rem",
  fontWeight: 700,
  color: "#fff",
  userSelect: "none",
});

export const ProfileName = styled(Typography)({
  fontWeight: 600,
  fontSize: "1.25rem",
  color: "#2e4490",
});

export const ProfileEmail = styled(Typography)({
  fontSize: "0.875rem",
  color: "gray",
});

export const ProfileRoleBadge = styled(Box)({
  display: "inline-flex",
  alignItems: "center",
  padding: "2px 12px",
  borderRadius: 20,
  backgroundColor: "#e8edf8",
  color: "#2e4490",
  fontSize: "0.75rem",
  fontWeight: 600,
  letterSpacing: "0.04em",
  textTransform: "uppercase",
});

export const ProfileDivider = styled(Divider)({
  margin: 0,
});

export const ProfileFormContainer = styled("form")({
  display: "flex",
  flexDirection: "column",
  padding: "1.75rem 1.5rem",
  gap: "1.25rem",
});

export const ProfileFormTitle = styled(Typography)({
  fontWeight: 600,
  fontSize: "1rem",
  color: "#333",
  marginBottom: "0.25rem",
});
