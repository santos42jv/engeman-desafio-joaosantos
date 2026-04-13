import { Box, Card, styled, Typography } from "@mui/material";

export const StyledPropertyCard = styled(Card)({
  width: 260,
  boxSizing: "border-box",
  display: "flex",
  flexDirection: "column",
  position: "relative",
  border: "1px solid #e8edf5",
  borderRadius: 14,
  boxShadow: "none",
  overflow: "hidden",
  transition: "transform 0.2s ease, box-shadow 0.2s ease",
  "&:hover": {
    transform: "translateY(-3px)",
    boxShadow: "0 8px 28px rgba(46, 68, 144, 0.12)",
  },
});

export const StyledPropertyCardImage = styled("img")({
  width: "100%",
  height: 165,
  objectFit: "cover",
  flexShrink: 0,
  display: "block",
});

export const StyledPropertyCardBody = styled(Box)({
  display: "flex",
  flexDirection: "column",
  width: "100%",
  padding: "12px 14px 14px",
  boxSizing: "border-box",
  gap: "10px",
  backgroundColor: "#fff",
});

export const PropertyCardTitle = styled(Typography)({
  fontWeight: 600,
  fontSize: "0.9375rem",
  color: "#1a2a5e",
  lineHeight: 1.35,
  display: "-webkit-box",
  WebkitLineClamp: 1,
  WebkitBoxOrient: "vertical",
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
  maxWidth: "100%",
});

export const PropertyCardLocation = styled(Typography)({
  fontSize: "0.78rem",
  color: "#999",
  display: "flex",
  alignItems: "center",
  gap: "0.2rem",
});

export const PropertyCardPrice = styled(Typography)({
  fontSize: "1.1rem",
  fontWeight: 700,
  color: "#2e4490",
  letterSpacing: "-0.3px",
});

export const PropertyCardDivider = styled(Box)({
  height: 1,
  backgroundColor: "#f0f3f9",
  width: "100%",
});

export const PropertyCardMeta = styled(Box)({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
});

export const MetaItem = styled(Box)({
  display: "flex",
  alignItems: "center",
  gap: "0.25rem",
  fontSize: "0.8rem",
  color: "#666",
});

export const PropertyTypeBadge = styled(Box)({
  display: "inline-flex",
  alignItems: "center",
  padding: "2px 8px",
  borderRadius: 6,
  backgroundColor: "#eef2ff",
  color: "#2e4490",
  fontSize: "0.7rem",
  fontWeight: 600,
  letterSpacing: "0.03em",
  textTransform: "uppercase",
});

export const StatusDot = styled(Box, {
  shouldForwardProp: (prop) => prop !== "active",
})(({ active }: { active?: boolean }) => ({
  width: 7,
  height: 7,
  borderRadius: "50%",
  backgroundColor: active ? "#4caf50" : "#bbb",
  flexShrink: 0,
}));

export const FavoriteButton = styled("button")({
  position: "absolute",
  top: 10,
  right: 10,
  zIndex: 1,
  border: "none",
  borderRadius: "50%",
  width: 34,
  height: 34,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: "rgba(255, 255, 255, 0.92)",
  backdropFilter: "blur(4px)",
  cursor: "pointer",
  boxShadow: "0 1px 6px rgba(0,0,0,0.12)",
  transition: "transform 0.15s ease, background 0.15s ease",
  "&:hover": {
    backgroundColor: "#fff",
    transform: "scale(1.08)",
  },
});
