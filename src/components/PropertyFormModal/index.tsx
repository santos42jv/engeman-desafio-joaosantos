import {
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  MenuItem,
  Grid,
  Typography,
  CircularProgress,
} from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import type { PropertyData } from "../../interfaces/property-data";
import { usePropertyForm } from "./usePropertyForm";
import { ImagePreviewBox, UploadButton, ImagePreviewGrid } from "./style";

interface PropertyFormModalProps {
  open: boolean;
  onClose: () => void;
  onSave: () => void;
  initialData?: PropertyData | null;
}

const PROPERTY_TYPES = [
  { value: "CASA", label: "Casa" },
  { value: "APARTAMENTO", label: "Apartamento" },
  { value: "TERRENO", label: "Terreno" },
];

export default function PropertyFormModal({
  open,
  onClose,
  onSave,
  initialData,
}: PropertyFormModalProps) {
  const {
    register,
    errors,
    handleSubmit,
    imageUrls,
    isUploading,
    isSaving,
    imageError,
    submitError,
    handleImageUpload,
    handleRemoveImage,
  } = usePropertyForm({ initialData, onSave });

  const isEditing = !!initialData;

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>
        {isEditing ? "Editar imóvel" : "Cadastrar imóvel"}
      </DialogTitle>

      <DialogContent dividers>
        <Grid container spacing={2} sx={{ mt: 0.5 }}>
          <Grid size={12}>
            <TextField
              label="Nome do imóvel"
              fullWidth
              required
              error={!!errors.name}
              helperText={
                errors.name?.message ?? "Mínimo 10, máximo 100 caracteres"
              }
              slotProps={{ htmlInput: { minLength: 10, maxLength: 100 } }}
              {...register("name")}
            />
          </Grid>

          <Grid size={12}>
            <TextField
              label="Descrição"
              fullWidth
              required
              multiline
              rows={3}
              error={!!errors.description}
              helperText={errors.description?.message}
              {...register("description")}
            />
          </Grid>

          <Grid size={{ xs: 12, sm: 6 }}>
            <TextField
              select
              label="Tipo"
              fullWidth
              required
              defaultValue="CASA"
              error={!!errors.type}
              helperText={errors.type?.message}
              {...register("type")}
            >
              {PROPERTY_TYPES.map((t) => (
                <MenuItem key={t.value} value={t.value}>
                  {t.label}
                </MenuItem>
              ))}
            </TextField>
          </Grid>

          <Grid size={{ xs: 12, sm: 6 }}>
            <TextField
              label="Valor (R$)"
              type="number"
              fullWidth
              required
              error={!!errors.value}
              helperText={errors.value?.message}
              slotProps={{ htmlInput: { min: 0, step: "1000" } }}
              {...register("value")}
            />
          </Grid>

          <Grid size={{ xs: 6, sm: 3 }}>
            <TextField
              label="Quartos"
              type="number"
              fullWidth
              required
              error={!!errors.bedrooms}
              helperText={errors.bedrooms?.message}
              slotProps={{ htmlInput: { min: 0 } }}
              {...register("bedrooms")}
            />
          </Grid>

          <Grid size={{ xs: 6, sm: 3 }}>
            <TextField
              label="Área (m²)"
              type="number"
              fullWidth
              required
              error={!!errors.area}
              helperText={errors.area?.message}
              slotProps={{ htmlInput: { min: 0 } }}
              {...register("area")}
            />
          </Grid>

          <Grid size={{ xs: 12, sm: 6 }}>
            <TextField
              label="Endereço"
              fullWidth
              required
              error={!!errors.address}
              helperText={errors.address?.message}
              {...register("address")}
            />
          </Grid>

          <Grid size={{ xs: 12, sm: 5 }}>
            <TextField
              label="Cidade"
              fullWidth
              required
              error={!!errors.city}
              helperText={errors.city?.message}
              {...register("city")}
            />
          </Grid>

          <Grid size={{ xs: 12, sm: 1 }}>
            <TextField
              label="UF"
              fullWidth
              required
              error={!!errors.state}
              helperText={errors.state?.message}
              slotProps={{ htmlInput: { maxLength: 2 } }}
              {...register("state")}
            />
          </Grid>

          <Grid size={12}>
            <Typography variant="subtitle2" sx={{ mb: 1 }}>
              Imagens
            </Typography>

            <UploadButton component="label" disabled={isUploading}>
              {isUploading ? (
                <CircularProgress size={18} sx={{ mr: 1 }} />
              ) : (
                <CloudUploadIcon sx={{ mr: 1 }} />
              )}
              {isUploading ? "Enviando..." : "Selecionar imagens"}
              <input
                type="file"
                accept="image/*"
                multiple
                hidden
                onChange={handleImageUpload}
              />
            </UploadButton>

            {imageError && (
              <Typography
                variant="caption"
                color="error"
                sx={{ mt: 0.5, display: "block" }}
              >
                {imageError}
              </Typography>
            )}

            {imageUrls.length > 0 && (
              <ImagePreviewGrid>
                {imageUrls.map((url, index) => (
                  <ImagePreviewBox key={index}>
                    <img src={url} alt={`Preview ${index + 1}`} />
                    <button
                      type="button"
                      onClick={() => handleRemoveImage(index)}
                      aria-label="Remover imagem"
                    >
                      ×
                    </button>
                  </ImagePreviewBox>
                ))}
              </ImagePreviewGrid>
            )}
          </Grid>
        </Grid>
      </DialogContent>

      {submitError && (
        <Alert severity="error" sx={{ mx: 3, mb: 1 }}>
          {submitError}
        </Alert>
      )}

      <DialogActions sx={{ px: 3, py: 2 }}>
        <Button onClick={onClose} disabled={isSaving}>
          Cancelar
        </Button>
        <Button
          variant="contained"
          onClick={handleSubmit}
          disabled={isSaving || isUploading}
          startIcon={
            isSaving ? <CircularProgress size={16} color="inherit" /> : null
          }
        >
          {isSaving
            ? "Salvando..."
            : isEditing
              ? "Salvar alterações"
              : "Cadastrar"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
