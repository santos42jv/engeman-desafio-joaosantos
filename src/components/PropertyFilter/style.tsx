import { Box, styled, TextField, Select, Button } from "@mui/material";

export const FilterContainer = styled(Box)({
  display: "flex",
  flexWrap: "wrap",
  alignItems: "flex-end",
  gap: "0.75rem",
  width: "100%",
  padding: "1rem 1.25rem",
  backgroundColor: "#fff",
  borderRadius: 12,
  boxSizing: "border-box",
  border: "1px solid #e0e0e0",
});

export const FilterFieldName = styled(TextField)({
  flex: "1 1 200px",
  maxWidth: 280,
  minWidth: 160,
  backgroundColor: "#fafafa",
});

export const FilterFieldPrice = styled(TextField)({
  flex: "1 1 120px",
  maxWidth: 160,
  minWidth: 120,
  backgroundColor: "#fafafa",
});

export const FilterFieldBedrooms = styled(TextField)({
  flex: "1 1 100px",
  maxWidth: 130,
  minWidth: 100,
  backgroundColor: "#fafafa",
});

export const FilterSelectWrapper = styled(Box)({
  flex: "1 1 130px",
  maxWidth: 170,
  minWidth: 130,
});

export const FilterSelect = styled(Select)({
  width: "100%",
  backgroundColor: "#fafafa",
});

export const FilterActions = styled(Box)({
  display: "flex",
  alignItems: "center",
  gap: "0.5rem",
  marginLeft: "auto",
});

export const ClearButton = styled(Button)({
  whiteSpace: "nowrap",
});
