import { Box, styled } from "@mui/material";

export const NavbarSection = styled(Box, {
  shouldForwardProp: (prop) => prop !== "visible",
})(({ visible }: { visible?: boolean }) => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  width: "100%",
  height: 64,
  backgroundColor: "#fff",
  borderBottom: "1px solid #e8edf5",
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  zIndex: 1100,
  padding: "0 2rem",
  boxSizing: "border-box",
  transform: visible ? "translateY(0)" : "translateY(-100%)",
  transition: "transform 0.3s ease, box-shadow 0.3s ease",
  boxShadow: visible ? "0 1px 12px rgba(46, 68, 144, 0.07)" : "none",
}));

export const NavLogo = styled("a")({
  display: "flex",
  alignItems: "center",
  gap: "0.4rem",
  textDecoration: "none",
  userSelect: "none",
});

export const LogoDot = styled(Box)({
  width: 8,
  height: 8,
  borderRadius: "50%",
  backgroundColor: "#ee5f3d",
  flexShrink: 0,
  marginBottom: 2,
});

export const NavLinks = styled(Box)({
  display: "flex",
  alignItems: "center",
  gap: "0.25rem",
});

export const NavLink = styled("a", {
  shouldForwardProp: (prop) => prop !== "active",
})(({ active }: { active?: boolean }) => ({
  display: "flex",
  alignItems: "center",
  gap: "0.35rem",
  padding: "0.4rem 0.85rem",
  borderRadius: 8,
  fontSize: "0.875rem",
  fontWeight: active ? 600 : 400,
  color: active ? "#2e4490" : "#666",
  backgroundColor: active ? "#eef2ff" : "transparent",
  textDecoration: "none",
  transition: "all 0.18s ease",
  whiteSpace: "nowrap",
  "&:hover": {
    backgroundColor: active ? "#eef2ff" : "#f5f7fb",
    color: "#2e4490",
  },
}));
