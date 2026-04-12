import { CardActionArea, CircularProgress, Typography } from "@mui/material";
import SingleBedIcon from "@mui/icons-material/SingleBed";
import SquareFootOutlinedIcon from "@mui/icons-material/SquareFootOutlined";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";

import { usePropertyCard } from "./usePropertyCard";
import type { PropertyData } from "../../interfaces/property-data";
import {
  StyledPropertyCard,
  StyledPropertyCardImage,
  StyledPropertyCardBody,
  PropertyCardTitle,
  PropertyCardLocation,
  PropertyCardPrice,
  PropertyCardDivider,
  PropertyCardMeta,
  MetaItem,
  PropertyTypeBadge,
  StatusDot,
  FavoriteButton,
} from "./style";

interface PropertyCardProps {
  property: PropertyData;
  favorited?: boolean;
  onFavorite?: (property: PropertyData) => void;
  onUnfavorite?: (id: number) => void;
  onClick?: () => void;
}

export default function PropertyCard({
  property,
  favorited = false,
  onFavorite,
  onUnfavorite,
  onClick,
}: PropertyCardProps) {
  const {
    loadingFavorite,
    formattedValue,
    firstImageUrl,
    locationLabel,
    typeLabel,
    handleToggleFavorite,
  } = usePropertyCard({ property, favorited, onFavorite, onUnfavorite });

  return (
    <StyledPropertyCard>
      <FavoriteButton onClick={handleToggleFavorite} aria-label="Favoritar">
        {loadingFavorite ? (
          <CircularProgress size={15} sx={{ color: "#ee5f3d" }} />
        ) : favorited ? (
          <FavoriteIcon sx={{ fontSize: 17, color: "#ee5f3d" }} />
        ) : (
          <FavoriteBorderIcon sx={{ fontSize: 17, color: "#aaa" }} />
        )}
      </FavoriteButton>

      <CardActionArea
        onClick={onClick}
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "stretch",
          height: "100%",
        }}
      >
        <StyledPropertyCardImage src={firstImageUrl} alt={property.name} />

        <StyledPropertyCardBody>
          <PropertyCardTitle>{property.name}</PropertyCardTitle>

          <PropertyCardLocation>
            <LocationOnOutlinedIcon sx={{ fontSize: 13, color: "#bbb" }} />
            {locationLabel}
          </PropertyCardLocation>

          <PropertyCardPrice>{formattedValue}</PropertyCardPrice>

          <PropertyCardDivider />

          <PropertyCardMeta>
            <MetaItem>
              <SingleBedIcon sx={{ fontSize: 15, color: "#2e4490" }} />
              <Typography variant="caption">{property.bedrooms} qts</Typography>
            </MetaItem>

            <MetaItem>
              <SquareFootOutlinedIcon sx={{ fontSize: 15, color: "#2e4490" }} />
              <Typography variant="caption">{property.area} m²</Typography>
            </MetaItem>

            <MetaItem>
              <StatusDot active={property.active} />
              <Typography
                variant="caption"
                sx={{ color: property.active ? "#4caf50" : "#bbb" }}
              >
                {property.active ? "Ativo" : "Inativo"}
              </Typography>
            </MetaItem>
          </PropertyCardMeta>

          <PropertyTypeBadge>{typeLabel}</PropertyTypeBadge>
        </StyledPropertyCardBody>
      </CardActionArea>
    </StyledPropertyCard>
  );
}
