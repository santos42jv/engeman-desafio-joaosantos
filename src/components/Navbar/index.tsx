import { Typography } from "@mui/material";

import AvatarIcon from "../AvatarIcon";
import { useNavbar } from "./useNavbar";
import { NavbarSection, NavLogo, LogoDot, NavLinks, NavLink } from "./style";

export default function Navbar() {
  const { tabValue, visible, canSeeProperties } = useNavbar();

  const links = [
    {
      label: "Home",
      href: "/",
    },
    ...(canSeeProperties
      ? [
          {
            label: "Imóveis",
            href: "/meus-imoveis",
          },
        ]
      : []),
    {
      label: "Favoritos",
      href: "/favoritos",
    },
    {
      label: "Perfil",
      href: "/perfil",
    },
  ];

  return (
    <NavbarSection visible={visible}>
      <NavLogo href="/">
        <Typography
          sx={{
            fontWeight: 800,
            fontSize: "1.2rem",
            color: "#2e4490",
            letterSpacing: "-0.5px",
            lineHeight: 1,
          }}
        >
          Key
        </Typography>
        <Typography
          sx={{
            fontWeight: 800,
            fontSize: "1.2rem",
            color: "#ee5f3d",
            letterSpacing: "-0.5px",
            lineHeight: 1,
          }}
        >
          Space
        </Typography>
        <LogoDot />
      </NavLogo>

      <NavLinks>
        {links.map((link, i) => (
          <NavLink key={link.href} href={link.href} active={tabValue === i}>
            {link.label}
          </NavLink>
        ))}
      </NavLinks>

      <AvatarIcon />
    </NavbarSection>
  );
}
