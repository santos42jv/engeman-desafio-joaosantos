import { Box, Card, styled, Typography } from "@mui/material";

export const StyledPropertyCard = styled(Card)({
 height: 350,
 width: 240,
 boxSizing: "border-box",
 display: "flex",
 flexDirection: "column",
 position: "relative",
});

export const StyledPropertyCardImage = styled("img")({
  display: "flex",
  flex: 1,
  width: "100%",
  height: 150,
  objectFit: "cover",
});

export const StyledPropertyCardBody = styled(Box)({
  display: "flex",
  flexDirection: "column",
  justifyContent: "start",
  alignItems: "center",
  width: "100%",
  padding: "8px",
  boxSizing: "border-box",
});

export const StyledPropertyCardInfoBox = styled(Box)({
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-around",
  width: "100%",
  boxSizing: "border-box",
  gap: 4,
  paddingTop: 8,
});

export const StyledPropertyCardRow = styled(Box)({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
});

export const CardIconsGroup = styled(Box)({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  flex: 1,
});

export const StyledPropertyCardIconLabel = styled(Typography)({
  display: "flex",
  alignItems: "center",
  gap: 2,
});

export const FavoriteButton = styled("button")({
  position: "absolute",
  top: 8,
  right: 8,
  zIndex: 1,
  border: "none",
  borderRadius: "50%",
  width: 32,
  height: 32,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: "rgba(255, 255, 255, 0.85)",
  cursor: "pointer",
  "&:hover": {
    backgroundColor: "rgba(255, 255, 255, 1)",
  },
});
