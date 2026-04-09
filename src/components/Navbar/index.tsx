import { Avatar, Tab, Tabs, Typography } from "@mui/material";
import React from "react";
import { NavbarSection } from "./style";

export default function Navbar() {
  const [value, setValue] = React.useState(0);

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <NavbarSection>
      <Typography variant="h6" sx={{ fontWeight: 'bold', fontFamily: 'Mont-Serrat', color: 'primary.main' }}>
        KeySpace
      </Typography>
      <Tabs
        value={value}
        onChange={handleChange}
        aria-label="nav tabs example"
        role="navigation"
      >
        <Tab label="Page One" href="/drafts" />
        <Tab label="Imóveis" href="/imoveis" />
        <Tab label="Sobre" href="/spam" />
        <Tab label="Duvidas" href="/spam" />
        <Tab label="Contato" href="/spam" />
      </Tabs>
      <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
    </NavbarSection>
  );
}
