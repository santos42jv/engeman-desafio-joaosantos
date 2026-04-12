import { useState } from "react";
import { api } from "../../services/api";
import type { PropertyData } from "../../interfaces/property-data";

interface UsePropertyCardProps {
  property: PropertyData;
  initialFavorited?: boolean;
}

export const usePropertyCard = ({
  property,
  initialFavorited = false,
}: UsePropertyCardProps) => {
  const [favorited, setFavorited] = useState(initialFavorited);
  const [loadingFavorite, setLoadingFavorite] = useState(false);

  const formattedValue = property.value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });

  const firstImageUrl = property.imageUrls?.split(",")[0] ?? "";
  const locationLabel = `${property.city}, ${property.state}`;
  const typeLabel =
    property.type.charAt(0).toUpperCase() +
    property.type.slice(1).toLowerCase();
  const statusLabel = property.active ? "Ativo" : "Inativo";

  const handleToggleFavorite = async (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();

    if (!localStorage.getItem("token")) return;

    setLoadingFavorite(true);

    try {
      if (favorited) {
        await api.delete(`/api/user/favorites/${property.id}`);
      } else {
        await api.post(`/api/user/favorites/${property.id}`);
      }

      setFavorited((prev) => !prev);
    } catch (err) {
      console.error("Erro ao atualizar favorito:", err);
    } finally {
      setLoadingFavorite(false);
    }
  };

  return {
    favorited,
    loadingFavorite,
    formattedValue,
    firstImageUrl,
    locationLabel,
    typeLabel,
    statusLabel,
    handleToggleFavorite,
  };
};
