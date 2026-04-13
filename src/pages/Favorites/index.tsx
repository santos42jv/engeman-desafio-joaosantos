import { Skeleton, Typography } from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { useNavigate, useSearchParams } from "react-router-dom";

import PropertyCard from "../../components/PropertyCard";
import PropertyFilter from "../../components/PropertyFilter";
import { useFavorites } from "./useFavorites";
import type { PropertyData } from "../../interfaces/property-data";
import {
  FavoritesSection,
  FavoritesHeader,
  FavoritesGrid,
  SkeletonGrid,
  EmptyState,
} from "./style";

export default function Favorites() {
  const {
    favorites,
    favoriteIds,
    isLoading,
    isError,
    handleFavorite,
    handleUnfavorite,
  } = useFavorites();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const filtered = favorites.filter((p) => {
    const name = searchParams.get("name")?.toLowerCase() ?? "";
    const type = searchParams.get("type") ?? "";
    const minPrice = searchParams.get("minPrice")
      ? Number(searchParams.get("minPrice"))
      : null;
    const maxPrice = searchParams.get("maxPrice")
      ? Number(searchParams.get("maxPrice"))
      : null;
    const minBedrooms = searchParams.get("minBedrooms")
      ? Number(searchParams.get("minBedrooms"))
      : null;

    if (name && !p.name.toLowerCase().includes(name)) return false;
    if (type && p.type !== type) return false;
    if (minPrice !== null && p.value < minPrice) return false;
    if (maxPrice !== null && p.value > maxPrice) return false;
    if (minBedrooms !== null && p.bedrooms < minBedrooms) return false;

    return true;
  });

  return (
    <FavoritesSection>
      <FavoritesHeader>
        <Typography
          variant="h5"
          sx={{ fontWeight: 600, mb: 1.5, ml: 1 }}
          color="primary"
        >
          Meus favoritos
        </Typography>

        <PropertyFilter />

        {!isLoading && (
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ mt: 1, ml: 1 }}
          >
            {filtered.length > 0
              ? `${filtered.length} imóvel(is) encontrado(s)`
              : "Nenhum resultado para os filtros aplicados."}
          </Typography>
        )}
      </FavoritesHeader>

      {isError && (
        <Typography color="error">
          Erro ao carregar favoritos. Tente novamente.
        </Typography>
      )}

      {isLoading ? (
        <SkeletonGrid>
          {Array.from({ length: 8 }).map((_, i) => (
            <Skeleton
              key={i}
              variant="rectangular"
              width={240}
              height={350}
              sx={{ borderRadius: 2 }}
            />
          ))}
        </SkeletonGrid>
      ) : filtered.length === 0 ? (
        <EmptyState>
          <FavoriteBorderIcon sx={{ fontSize: 56, color: "lightgray" }} />
          <Typography variant="body1" color="text.secondary">
            {favorites.length === 0
              ? "Você ainda não favoritou nenhum imóvel."
              : "Nenhum favorito corresponde aos filtros."}
          </Typography>
        </EmptyState>
      ) : (
        <FavoritesGrid>
          {filtered.map((property: PropertyData) => (
            <PropertyCard
              key={property.id}
              property={property}
              favorited={favoriteIds.has(property.id)}
              onFavorite={handleFavorite}
              onUnfavorite={handleUnfavorite}
              onClick={() => navigate(`/imoveis/${property.id}`)}
            />
          ))}
        </FavoritesGrid>
      )}
    </FavoritesSection>
  );
}
