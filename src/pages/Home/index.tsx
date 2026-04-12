import { Pagination, Skeleton, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import HouseOutlinedIcon from "@mui/icons-material/HouseOutlined";
import PropertyCard from "../../components/PropertyCard";
import PropertyFilter from "../../components/PropertyFilter";
import type { PropertyData } from "../../interfaces/property-data";
import { useHome } from "./useHome";
import {
  HomeSection,
  HomeHeader,
  PropertyGrid,
  PaginationWrapper,
  EmptyState,
  SkeletonGrid,
} from "./style";

export default function Home() {
  const {
    properties,
    totalPages,
    totalElements,
    favoriteIds,
    handleFavorite,
    handleUnfavorite,
    page,
    isLoading,
    isError,
    handlePageChange,
  } = useHome();

  const navigate = useNavigate();

  return (
    <HomeSection>
      <HomeHeader>
        <Typography
          variant="h5"
          sx={{ fontWeight: 600, mb: 1.5, ml: 1 }}
          color="primary"
        >
          Imóveis disponíveis
        </Typography>

        <PropertyFilter />

        {!isLoading && totalElements > 0 && (
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ mt: 1, ml: 1 }}
          >
            {totalElements} imóvel(is) encontrado(s)
          </Typography>
        )}
      </HomeHeader>

      {isError && (
        <Typography color="error">
          Erro ao carregar imóveis. Tente novamente.
        </Typography>
      )}

      {isLoading ? (
        <SkeletonGrid>
          {Array.from({ length: 12 }).map((_, i) => (
            <Skeleton
              key={i}
              variant="rectangular"
              width={240}
              height={340}
              sx={{ borderRadius: 2 }}
            />
          ))}
        </SkeletonGrid>
      ) : properties.length === 0 ? (
        <EmptyState>
          <HouseOutlinedIcon sx={{ fontSize: 56, color: "lightgray" }} />
          <Typography variant="body1" color="text.secondary">
            Nenhum imóvel encontrado.
          </Typography>
        </EmptyState>
      ) : (
        <PropertyGrid>
          {properties.map((property: PropertyData) => (
            <PropertyCard
              key={property.id}
              property={property}
              favorited={favoriteIds.has(property.id)}
              onFavorite={handleFavorite}
              onUnfavorite={handleUnfavorite}
              onClick={() => navigate(`/imoveis/${property.id}`)}
            />
          ))}
        </PropertyGrid>
      )}

      {!isLoading && totalPages > 1 && (
        <PaginationWrapper>
          <Pagination
            count={totalPages}
            page={page}
            onChange={handlePageChange}
            color="primary"
            shape="rounded"
            showFirstButton
            showLastButton
          />
        </PaginationWrapper>
      )}
    </HomeSection>
  );
}
