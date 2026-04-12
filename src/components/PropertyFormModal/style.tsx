import { Box, Button, styled } from "@mui/material";

export const UploadButton = styled(Button)({
  border: "2px dashed #ccc",
  borderRadius: 8,
  padding: "0.75rem 1.5rem",
  color: "#666",
  backgroundColor: "#fafafa",
  width: "100%",
  justifyContent: "center",
  textTransform: "none",
  "&:hover": {
    backgroundColor: "#f0f4ff",
    borderColor: "#1976d2",
    color: "#1976d2",
  },
}) as typeof Button;

export const ImagePreviewGrid = styled(Box)({
  display: "flex",
  flexWrap: "wrap",
  gap: "0.75rem",
  marginTop: "0.75rem",
});

export const ImagePreviewBox = styled(Box)({
  position: "relative",
  width: 96,
  height: 96,
  borderRadius: 8,
  overflow: "hidden",
  border: "1px solid #e0e0e0",

  "& img": {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    display: "block",
  },

  "& button": {
    position: "absolute",
    top: 2,
    right: 2,
    width: 22,
    height: 22,
    borderRadius: "50%",
    border: "none",
    backgroundColor: "rgba(0,0,0,0.55)",
    color: "#fff",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 16,
    lineHeight: 1,
    padding: 0,
    "&:hover": {
      backgroundColor: "rgba(200,0,0,0.75)",
    },
  },
});
