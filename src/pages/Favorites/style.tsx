import { Box, styled } from "@mui/material";

export const FavoritesSection = styled(Box)({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  width: "100%",
  minHeight: "calc(100vh - 64px)",
  boxSizing: "border-box",
  backgroundColor: "#f5f7fb",
});

export const FavoritesHeader = styled(Box)({
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  width: "100%",
  maxWidth: 1200,
  marginBottom: "2rem",
});

export const FavoritesGrid = styled(Box)({
  display: "grid",
  gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
  gap: "1.5rem",
  width: "100%",
  maxWidth: 1200,
  alignItems: "start",
});

export const SkeletonGrid = styled(Box)({
  display: "grid",
  gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
  gap: "1.5rem",
  width: "100%",
  maxWidth: 1200,
});

export const EmptyState = styled(Box)({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  width: "100%",
  maxWidth: 1200,
  padding: "5rem 0",
  gap: "1rem",
});
