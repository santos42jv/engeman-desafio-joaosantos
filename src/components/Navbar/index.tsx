import { Tab, Tabs, Typography } from "@mui/material";
import { NavbarSection } from "./style";
import AvatarIcon from "../AvatarIcon";
import { useNavbar } from "./useNavbar";

export default function Navbar() {
  const { tabValue, visible, canSeeProperties } = useNavbar();

  return (
    <NavbarSection
      sx={{
        position: "fixed",
        top: 0,
        left: 32,
        right: 32,
        zIndex: 1100,
        transform: visible ? "translateY(0)" : "translateY(-100%)",
        transition: "transform 0.3s ease",
        width: "calc(100% - 64px)",
      }}
    >
      <Typography
        variant="h6"
        sx={{
          fontWeight: "bold",
          fontFamily: "Mont-Serrat",
          color: "primary.main",
        }}
      >
        KeySpace
      </Typography>

      <Tabs value={tabValue} aria-label="nav tabs example" role="navigation">
        <Tab label="Home" href="/" />
        {canSeeProperties && <Tab label="Imóveis" href="/meus-imoveis" />}
        <Tab label="Favoritos" href="/favoritos" />
        <Tab label="Perfil" href="/perfil" />
      </Tabs>

      <AvatarIcon />
    </NavbarSection>
  );
}
