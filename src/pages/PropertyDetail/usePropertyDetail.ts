import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { api } from "../../services/api";
import type { PropertyData } from "../../interfaces/property-data";
import { useFavorites } from "../Favorites/useFavorites";

const fetchProperty = async (id: string): Promise<PropertyData> => {
  const { data } = await api.get(`/api/property/${id}`);
  return data;
};

export const usePropertyDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [activeIndex, setActiveIndex] = useState(0);

  const {
    data: property,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["property", id],
    queryFn: () => fetchProperty(id!),
    enabled: !!id,
  });

  const { favoriteIds, handleFavorite, handleUnfavorite } = useFavorites();

  const images = property?.imageUrls
    ? property.imageUrls
        .split(",")
        .map((u) => u.trim())
        .filter(Boolean)
    : [];

  const isFavorited = property ? favoriteIds.has(property.id) : false;

  const formattedValue = property
    ? property.value.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
      })
    : "";

  const typeLabel = property
    ? property.type.charAt(0).toUpperCase() +
      property.type.slice(1).toLowerCase()
    : "";

  const handlePrev = () =>
    setActiveIndex((i) => (i === 0 ? images.length - 1 : i - 1));

  const handleNext = () =>
    setActiveIndex((i) => (i === images.length - 1 ? 0 : i + 1));

  const handleThumbnail = (index: number) => setActiveIndex(index);

  const handleBack = () => navigate(-1);

  const handleToggleFavorite = async () => {
    if (!property) return;
    if (isFavorited) {
      await handleUnfavorite(property.id);
    } else {
      await handleFavorite(property);
    }
  };

  return {
    property,
    isLoading,
    isError,
    images,
    activeIndex,
    isFavorited,
    formattedValue,
    typeLabel,
    handlePrev,
    handleNext,
    handleThumbnail,
    handleBack,
    handleToggleFavorite,
  };
};
