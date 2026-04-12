import { Box, Chip, styled } from "@mui/material";

export const PageWrapper = styled(Box)({
  minHeight: "calc(100vh - 64px)",
  backgroundColor: "#f5f7fb",
  padding: "2rem 1.5rem",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  boxSizing: "border-box",
});

export const ContentGrid = styled(Box)(({ theme }) => ({
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: "2.5rem",
  width: "100%",
  maxWidth: 1100,
  alignItems: "start",

  [theme.breakpoints.down("md")]: {
    gridTemplateColumns: "1fr",
  },
}));

export const BackRow = styled(Box)({
  display: "flex",
  alignItems: "center",
  width: "100%",
  maxWidth: 1100,
  marginBottom: "1.5rem",
});

export const GalleryWrapper = styled(Box)({
  display: "flex",
  flexDirection: "column",
  gap: "0.75rem",
  position: "sticky",
  top: "80px",
});

export const MainImageBox = styled(Box)({
  position: "relative",
  width: "100%",
  aspectRatio: "4 / 3",
  borderRadius: 12,
  overflow: "hidden",
  backgroundColor: "#e0e0e0",
  boxShadow: "0 4px 24px rgba(0,0,0,0.10)",
});

export const MainImage = styled("img")({
  width: "100%",
  height: "100%",
  objectFit: "cover",
  display: "block",
  transition: "opacity 0.25s ease",
});

export const GalleryArrow = styled("button")<{ direction: "left" | "right" }>(
  ({ direction }) => ({
    position: "absolute",
    top: "50%",
    transform: "translateY(-50%)",
    ...(direction === "left" ? { left: 10 } : { right: 10 }),
    zIndex: 2,
    background: "rgba(255,255,255,0.88)",
    border: "none",
    borderRadius: "50%",
    width: 36,
    height: 36,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    fontSize: 18,
    color: "#333",
    boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
    transition: "background 0.2s",
    "&:hover": {
      background: "rgba(255,255,255,1)",
    },
  }),
);

export const ImageCounter = styled(Box)({
  position: "absolute",
  bottom: 10,
  right: 12,
  background: "rgba(0,0,0,0.45)",
  color: "#fff",
  fontSize: "0.75rem",
  borderRadius: 20,
  padding: "2px 10px",
  userSelect: "none",
});

export const ThumbnailRow = styled(Box)({
  display: "flex",
  gap: "0.5rem",
  overflowX: "auto",
  paddingBottom: 4,
  "&::-webkit-scrollbar": { height: 4 },
  "&::-webkit-scrollbar-thumb": { borderRadius: 4, backgroundColor: "#ccc" },
});

export const Thumbnail = styled("img")<{ active: boolean }>(({ active }) => ({
  width: 64,
  height: 52,
  objectFit: "cover",
  borderRadius: 6,
  cursor: "pointer",
  flexShrink: 0,
  border: active ? "2px solid #2e4490" : "2px solid transparent",
  opacity: active ? 1 : 0.65,
  transition: "opacity 0.2s, border-color 0.2s",
  "&:hover": { opacity: 1 },
}));

export const InfoPanel = styled(Box)({
  display: "flex",
  flexDirection: "column",
  gap: "1.25rem",
});

export const TitleRow = styled(Box)({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "flex-start",
  gap: "0.5rem",
});

export const PriceTag = styled(Box)({
  display: "inline-block",
  fontSize: "1.75rem",
  fontWeight: 700,
  color: "#2e4490",
  letterSpacing: "-0.5px",
});

export const MetaRow = styled(Box)({
  display: "flex",
  flexWrap: "wrap",
  gap: "0.75rem",
  alignItems: "center",
});

export const MetaChip = styled(Box)({
  display: "flex",
  alignItems: "center",
  gap: "0.4rem",
  backgroundColor: "#fff4ee",
  borderRadius: 8,
  padding: "0.35rem 0.75rem",
  fontSize: "0.875rem",
  color: "#ee5f3d",
  fontWeight: 500,
});

export const Divider = styled(Box)({
  height: 1,
  backgroundColor: "#e8eaf0",
  width: "100%",
});

export const SectionLabel = styled(Box)({
  fontSize: "0.75rem",
  fontWeight: 700,
  letterSpacing: "0.08em",
  textTransform: "uppercase",
  color: "#999",
  marginBottom: "0.35rem",
});

export const DescriptionBox = styled(Box)({
  fontSize: "0.9375rem",
  color: "#444",
  lineHeight: 1.7,
});

export const BrokerCard = styled(Box)({
  display: "flex",
  alignItems: "center",
  gap: "0.75rem",
  backgroundColor: "#fff",
  border: "1px solid #e8eaf0",
  borderRadius: 10,
  padding: "0.85rem 1rem",
});

export const BrokerAvatar = styled(Box)({
  width: 40,
  height: 40,
  borderRadius: "50%",
  backgroundColor: "#1976d2",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: "#fff",
  fontWeight: 700,
  fontSize: "1rem",
  flexShrink: 0,
});

export const StatusBadge = styled(Chip)({});

export const FavoriteBtn = styled("button")({
  background: "none",
  border: "none",
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  padding: 4,
  borderRadius: "50%",
  transition: "background 0.2s",
  "&:hover": { background: "#fee2e2" },
});

export const NoImageBox = styled(Box)({
  width: "100%",
  aspectRatio: "4 / 3",
  borderRadius: 12,
  backgroundColor: "#e9ecef",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexDirection: "column",
  gap: "0.5rem",
  color: "#aaa",
});
