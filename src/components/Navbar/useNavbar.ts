import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { useUser } from "../../context/UserContext";

const PUBLIC_ROUTES = ["/", "/favoritos", "/perfil", "/contato"];
const BROKER_ROUTES = [
  "/",
  "/meus-imoveis",
  "/favoritos",
  "/perfil",
  "/contato",
];

const NESTED_ROUTE_MAP: Record<string, string> = {
  "/imoveis": "/",
};

export const useNavbar = () => {
  const [visible, setVisible] = useState(true);
  const lastScrollY = useRef(0);
  const { pathname } = useLocation();
  const { user } = useUser();

  const canSeeProperties = user?.role === "ADMIN" || user?.role === "CORRETOR";
  const routes = canSeeProperties ? BROKER_ROUTES : PUBLIC_ROUTES;

  const resolvedPath =
    Object.entries(NESTED_ROUTE_MAP).find(([prefix]) =>
      pathname.startsWith(prefix),
    )?.[1] ?? pathname;

  const tabIndex = routes.indexOf(resolvedPath);
  const tabValue = tabIndex === -1 ? false : tabIndex;

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const scrollingDown = currentScrollY > lastScrollY.current;
      const pastThreshold = currentScrollY > 80;

      if (scrollingDown && pastThreshold) {
        setVisible(false);
      } else {
        setVisible(true);
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return { tabValue, visible, canSeeProperties };
};
