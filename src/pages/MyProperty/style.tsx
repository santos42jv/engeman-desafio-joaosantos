import { Box, styled } from "@mui/material";

export const PageSection = styled(Box)({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  width: "100%",
  minHeight: "calc(100vh - 64px)",
  boxSizing: "border-box",
  backgroundColor: "#f5f7fb",
});

export const PageHeader = styled(Box)({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "flex-start",
  width: "100%",
  maxWidth: 1200,
  marginBottom: "1.5rem",
});

export const HeaderActions = styled(Box)({
  display: "flex",
  gap: "0.75rem",
  alignItems: "center",
});

export const PropertyTable = styled(Box)({
  width: "100%",
  maxWidth: 1200,
  backgroundColor: "#fff",
  borderRadius: 8,
  overflow: "hidden",
  boxShadow: "0 1px 4px rgba(0,0,0,0.08)",
});

export const TableHead = styled(Box)({});

export const TableBody = styled(Box)({});

interface TableRowProps {
  header?: boolean;
  isAdmin?: boolean;
}

export const TableRow = styled(Box, {
  shouldForwardProp: (prop) => prop !== "header" && prop !== "isAdmin",
})<TableRowProps>(({ header, isAdmin }) => ({
  display: "grid",
  gridTemplateColumns: isAdmin
    ? "2fr 1fr 1.5fr 1fr 1fr 1fr 0.8fr 1fr"
    : "2fr 1fr 1.5fr 1fr 1fr 0.8fr 1fr",
  alignItems: "center",
  padding: "0 1rem",
  borderBottom: "1px solid #f0f0f0",
  backgroundColor: header ? "#fafafa" : "#fff",
  minHeight: header ? 48 : 72,
  "&:last-child": {
    borderBottom: "none",
  },
  "&:hover": header ? {} : { backgroundColor: "#fafbff" },
}));

interface TableCellProps {
  align?: "right" | "left" | "center";
}

export const TableCell = styled(Box, {
  shouldForwardProp: (prop) => prop !== "align",
})<TableCellProps>(({ align }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: align === "right" ? "flex-end" : "flex-start",
  fontSize: "0.8125rem",
  fontWeight: 600,
  color: "#666",
  padding: "0 0.25rem",
}));

export const PropertyImage = styled("img")({
  width: 48,
  height: 48,
  borderRadius: 6,
  objectFit: "cover",
  flexShrink: 0,
  backgroundColor: "#eee",
});

export const ActionGroup = styled(Box)({
  display: "flex",
  alignItems: "center",
  gap: "0.25rem",
});

export const StatusChipWrapper = styled(Box)({
  display: "flex",
  alignItems: "center",
});

export const SkeletonWrapper = styled(Box)({
  display: "flex",
  flexDirection: "column",
  gap: "0.5rem",
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

export const PaginationWrapper = styled(Box)({
  display: "flex",
  justifyContent: "center",
  marginTop: "2rem",
  width: "100%",
  maxWidth: 1200,
});
