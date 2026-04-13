import {
  Skeleton,
  Typography,
  Chip,
  CircularProgress,
  IconButton,
  Tooltip,
  Box,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import SingleBedIcon from "@mui/icons-material/SingleBed";
import SquareFootOutlinedIcon from "@mui/icons-material/SquareFootOutlined";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import HouseOutlinedIcon from "@mui/icons-material/HouseOutlined";
import PersonOutlineIcon from "@mui/icons-material/PersonOutlineOutlined";
import ImageNotSupportedOutlinedIcon from "@mui/icons-material/ImageNotSupportedOutlined";

import { usePropertyDetail } from "./usePropertyDetail";
import {
  PageWrapper,
  BackRow,
  ContentGrid,
  GalleryWrapper,
  MainImageBox,
  MainImage,
  GalleryArrow,
  ImageCounter,
  ThumbnailRow,
  Thumbnail,
  InfoPanel,
  TitleRow,
  PriceTag,
  MetaRow,
  MetaChip,
  Divider,
  SectionLabel,
  DescriptionBox,
  BrokerCard,
  BrokerAvatar,
  FavoriteBtn,
  NoImageBox,
} from "./style";

export default function PropertyDetail() {
  const {
    property,
    isLoading,
    isError,
    images,
    activeIndex,
    isFavorited,
    loadingFavorite,
    formattedValue,
    typeLabel,
    handlePrev,
    handleNext,
    handleThumbnail,
    handleBack,
    handleToggleFavorite,
  } = usePropertyDetail();

  return (
    <PageWrapper>
      <BackRow>
        <IconButton onClick={handleBack} size="small" sx={{ mr: 1 }}>
          <ArrowBackIcon />
        </IconButton>
        <Typography variant="body2" color="text.secondary">
          Voltar
        </Typography>
      </BackRow>

      {isError && (
        <Typography color="error">
          Erro ao carregar imóvel. Tente novamente.
        </Typography>
      )}

      {isLoading ? (
        <ContentGrid>
          <Box
            sx={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}
          >
            <Skeleton
              variant="rectangular"
              width="100%"
              sx={{ aspectRatio: "4 / 3", borderRadius: 3 }}
            />
          </Box>

          <Box
            sx={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Skeleton variant="text" width="65%" height={40} />
              <Skeleton variant="circular" width={36} height={36} />
            </Box>
            <Skeleton variant="text" width="40%" height={48} />
            <Box sx={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
              {Array.from({ length: 4 }).map((_, i) => (
                <Skeleton key={i} variant="rounded" width={90} height={32} />
              ))}
            </Box>
            <Skeleton variant="text" width="55%" height={24} />
            <Skeleton variant="rectangular" width="100%" height={1} />
            <Box
              sx={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}
            >
              <Skeleton variant="text" width="20%" height={18} />
              <Skeleton variant="text" width="100%" height={20} />
              <Skeleton variant="text" width="90%" height={20} />
              <Skeleton variant="text" width="80%" height={20} />
            </Box>
            <Skeleton variant="rectangular" width="100%" height={1} />
            <Skeleton
              variant="rectangular"
              width="100%"
              height={72}
              sx={{ borderRadius: 2 }}
            />
          </Box>
        </ContentGrid>
      ) : property ? (
        <ContentGrid>
          <GalleryWrapper>
            {images.length === 0 ? (
              <NoImageBox>
                <ImageNotSupportedOutlinedIcon sx={{ fontSize: 48 }} />
                <Typography variant="body2">Sem imagens</Typography>
              </NoImageBox>
            ) : (
              <>
                <MainImageBox>
                  <MainImage
                    src={images[activeIndex]}
                    alt={`${property.name} - foto ${activeIndex + 1}`}
                  />

                  {images.length > 1 && (
                    <>
                      <GalleryArrow
                        direction="left"
                        onClick={handlePrev}
                        aria-label="Anterior"
                      >
                        <ArrowBackIosNewIcon sx={{ fontSize: 14 }} />
                      </GalleryArrow>
                      <GalleryArrow
                        direction="right"
                        onClick={handleNext}
                        aria-label="Próxima"
                      >
                        <ArrowForwardIosIcon sx={{ fontSize: 14 }} />
                      </GalleryArrow>
                      <ImageCounter>
                        {activeIndex + 1} / {images.length}
                      </ImageCounter>
                    </>
                  )}
                </MainImageBox>

                {images.length > 1 && (
                  <ThumbnailRow>
                    {images.map((url, i) => (
                      <Thumbnail
                        key={i}
                        src={url}
                        alt={`Miniatura ${i + 1}`}
                        active={i === activeIndex}
                        onClick={() => handleThumbnail(i)}
                      />
                    ))}
                  </ThumbnailRow>
                )}
              </>
            )}
          </GalleryWrapper>

          <InfoPanel>
            <TitleRow>
              <Typography
                variant="h5"
                sx={{ fontWeight: 700, lineHeight: 1.3, flex: 1 }}
              >
                {property.name}
              </Typography>

              <Tooltip
                title={
                  isFavorited
                    ? "Remover dos favoritos"
                    : "Adicionar aos favoritos"
                }
              >
                <FavoriteBtn
                  onClick={handleToggleFavorite}
                  aria-label="Favoritar"
                  disabled={loadingFavorite}
                >
                  {loadingFavorite ? (
                    <CircularProgress size={18} sx={{ color: "#ee5f3d" }} />
                  ) : isFavorited ? (
                    <FavoriteIcon color="primary" />
                  ) : (
                    <FavoriteBorderIcon color="primary" />
                  )}
                </FavoriteBtn>
              </Tooltip>
            </TitleRow>

            <PriceTag>{formattedValue}</PriceTag>

            <MetaRow>
              <MetaChip>
                <HouseOutlinedIcon sx={{ fontSize: 16 }} />
                {typeLabel}
              </MetaChip>

              <MetaChip>
                <SingleBedIcon sx={{ fontSize: 16 }} />
                {property.bedrooms}{" "}
                {property.bedrooms === 1 ? "quarto" : "quartos"}
              </MetaChip>

              <MetaChip>
                <SquareFootOutlinedIcon sx={{ fontSize: 16 }} />
                {property.area} m²
              </MetaChip>

              <Chip
                label={property.active ? "Ativo" : "Inativo"}
                color={property.active ? "success" : "default"}
                size="small"
              />
            </MetaRow>

            <div>
              <SectionLabel>Localização</SectionLabel>
              <MetaRow sx={{ gap: "0.35rem" }}>
                <LocationOnOutlinedIcon
                  sx={{ fontSize: 18, color: "#1976d2" }}
                />
                <Typography variant="body2" color="text.secondary">
                  {property.address} — {property.city}, {property.state}
                </Typography>
              </MetaRow>
            </div>

            <Divider />

            <div>
              <SectionLabel>Descrição</SectionLabel>
              <DescriptionBox>{property.description}</DescriptionBox>
            </div>

            <Divider />

            <div>
              <SectionLabel>Corretor responsável</SectionLabel>
              <BrokerCard>
                <BrokerAvatar>
                  {property.brokerName?.charAt(0).toUpperCase()}
                </BrokerAvatar>
                <div>
                  <Typography variant="body2" sx={{ fontWeight: 600 }}>
                    {property.brokerName}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    Corretor
                  </Typography>
                </div>
                <PersonOutlineIcon sx={{ ml: "auto", color: "#bbb" }} />
              </BrokerCard>
            </div>
          </InfoPanel>
        </ContentGrid>
      ) : null}
    </PageWrapper>
  );
}
