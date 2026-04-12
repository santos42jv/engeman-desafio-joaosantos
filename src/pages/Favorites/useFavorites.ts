import { useQuery, useQueryClient } from "@tanstack/react-query";
import { api } from "../../services/api";
import type { PropertyData } from "../../interfaces/property-data";

export const FAVORITES_QUERY_KEY = ["favorites"];

const getFavorites = async (): Promise<PropertyData[]> => {
  const { data } = await api.get("/api/user/favorites");
  return data;
};

export const useFavorites = () => {
  const queryClient = useQueryClient();

  const {
    data: favorites = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: FAVORITES_QUERY_KEY,
    queryFn: getFavorites,
  });

  const favoriteIds = new Set(favorites.map((f) => f.id));

  const handleUnfavorite = (id: number) => {
    queryClient.setQueryData<PropertyData[]>(FAVORITES_QUERY_KEY, (prev) =>
      prev ? prev.filter((p) => p.id !== id) : [],
    );
  };

  const handleFavorite = (property: PropertyData) => {
    queryClient.setQueryData<PropertyData[]>(FAVORITES_QUERY_KEY, (prev) =>
      prev ? [...prev, property] : [property],
    );
  };

  return {
    favorites,
    favoriteIds,
    isLoading,
    isError,
    handleFavorite,
    handleUnfavorite,
  };
};
