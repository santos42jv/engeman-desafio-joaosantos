import { CardActionArea, CircularProgress, Typography } from "@mui/material";
import { usePropertyCard } from "./usePropertyCard";
import type { PropertyData } from "../../interfaces/property-data";

import SingleBedIcon from "@mui/icons-material/SingleBed";
import SquareFootOutlinedIcon from "@mui/icons-material/SquareFootOutlined";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

import {
  StyledPropertyCard,
  StyledPropertyCardImage,
  StyledPropertyCardBody,
  StyledPropertyCardInfoBox,
  StyledPropertyCardRow,
  CardIconsGroup,
  StyledPropertyCardIconLabel,
  FavoriteButton,
} from "./style";

interface PropertyCardProps {
  property: PropertyData;
  initialFavorited?: boolean;
  onClick?: () => void;
}

export default function PropertyCard({
  property,
  initialFavorited = false,
  onClick,
}: PropertyCardProps) {
  const {
    favorited,
    loadingFavorite,
    formattedValue,
    firstImageUrl,
    locationLabel,
    typeLabel,
    statusLabel,
    handleToggleFavorite,
  } = usePropertyCard({ property, initialFavorited });

  return (
    <StyledPropertyCard>
      <FavoriteButton onClick={handleToggleFavorite}>
        {loadingFavorite ? (
          <CircularProgress size={16} color="error" />
        ) : favorited ? (
          <FavoriteIcon color="primary" sx={{ fontSize: 18 }} />
        ) : (
          <FavoriteBorderIcon color="primary" sx={{ fontSize: 18 }} />
        )}
      </FavoriteButton>

      <CardActionArea
        onClick={onClick}
        sx={{
          width: "100%",
          height: "100%",
          flexDirection: "column",
          display: "flex",
          alignItems: "center",
          justifyContent: "start",
        }}
      >
        <StyledPropertyCardImage src={firstImageUrl} alt={property.name} />

        <StyledPropertyCardBody>
            <Typography variant="h6" color="secondary" noWrap>
              {property.name}
            </Typography>

          <StyledPropertyCardInfoBox>
            <StyledPropertyCardRow>
              <Typography variant="body1">{typeLabel}</Typography>
              <Typography variant="body1">{formattedValue}</Typography>
            </StyledPropertyCardRow>

            <StyledPropertyCardRow>
              <Typography variant="body2">{property.address}</Typography>
              <Typography variant="body2">{locationLabel}</Typography>
            </StyledPropertyCardRow>

            <StyledPropertyCardRow sx={{ marginTop: 1 }}>
              <CardIconsGroup>
                <StyledPropertyCardIconLabel variant="body2">
                  <SingleBedIcon color="primary" sx={{ fontSize: 18 }} />
                  {property.bedrooms}
                </StyledPropertyCardIconLabel>
                <StyledPropertyCardIconLabel variant="body2">
                  <SquareFootOutlinedIcon
                    color="primary"
                    sx={{ fontSize: 18 }}
                  />
                  {property.area} m²
                </StyledPropertyCardIconLabel>
              </CardIconsGroup>
              <Typography variant="body2" sx={{ flex: 1, textAlign: "right" }}>
                {statusLabel}
              </Typography>
            </StyledPropertyCardRow>
          </StyledPropertyCardInfoBox>
        </StyledPropertyCardBody>
      </CardActionArea>
    </StyledPropertyCard>
  );
}
