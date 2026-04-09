import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Box,
  Typography,
} from "@mui/material";
import SingleBedIcon from "@mui/icons-material/SingleBed";
import SquareFootOutlinedIcon from "@mui/icons-material/SquareFootOutlined";
import Build from "../../assets/login-page-image.jpg";

export default function PropertyCard() {
  return (
    <Card
      sx={{
        display: "flex",
        flexDirection: "column",
        height: 320,
        width: 240,
      }}
    >
      <CardActionArea
        sx={{
          width: "100%",
          height: "100%",
          flexDirection: "column",
          display: "flex",
          alignItems: "center",
          justifyContent: "start",
        }}
      >
        <CardMedia
          component="img"
          height="150"
          image={Build}
          alt="green iguana"
          sx={{
            flex: 2,
          }}
        />

        <CardContent
          sx={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
            height: "100%",
          }}
        >
          <Box sx={{ paddingBottom: 1 }}>
            <Typography variant="h6">Apartamento no Centro</Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-around",
              width: "100%",
              boxSizing: "border-box",
              padding: "0 1rem",
            }}
          >
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Typography variant="body1">tipo</Typography>
              <Typography variant="body1">valor</Typography>
            </Box>
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Typography variant="body2">Rua das Flores, 123</Typography>
              <Typography variant="body2">São Paulo</Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                marginTop: 1,
              }}
            >
              <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', flex: 1}}>
                <Typography
                  variant="body2"
                  sx={{ display: "flex", alignItems: "center" }}
                >
                  <SingleBedIcon color="primary"/> 3
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ display: "flex", alignItems: "center" }}
                >
                  <SquareFootOutlinedIcon color="primary"/> 85 m²
                </Typography>
              </Box>
              <Typography
                variant="body2"
                sx={{ display: "flex", alignItems: "center", flex: 1, justifyContent: 'flex-end'}}
              >
                Ativo
              </Typography>
            </Box>
          </Box>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
