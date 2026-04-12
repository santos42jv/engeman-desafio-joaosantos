import {
  FormControl,
  InputLabel,
  MenuItem,
  Typography,
  InputAdornment,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import FilterListOffIcon from "@mui/icons-material/FilterListOff";

import { usePropertyFilter } from "./usePropertyFilter";
import {
  FilterContainer,
  FilterFieldName,
  FilterFieldPrice,
  FilterFieldBedrooms,
  FilterSelectWrapper,
  FilterSelect,
  FilterActions,
  ClearButton,
} from "./style";

export default function PropertyFilter() {
  const { filters, handleChange, handleClear, hasActiveFilters } =
    usePropertyFilter();

  return (
    <FilterContainer>
      <FilterFieldName
        label="Buscar por nome"
        size="small"
        value={filters.name}
        onChange={(e) => handleChange("name", e.target.value)}
        slotProps={{
          input: {
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon fontSize="small" color="action" />
              </InputAdornment>
            ),
          },
        }}
      />

      <FilterSelectWrapper>
        <FormControl size="small" fullWidth>
          <InputLabel>Tipo</InputLabel>
          <FilterSelect
            label="Tipo"
            value={filters.type}
            onChange={(e) => handleChange("type", e.target.value as string)}
          >
            <MenuItem value="">Todos</MenuItem>
            <MenuItem value="APARTAMENTO">Apartamento</MenuItem>
            <MenuItem value="CASA">Casa</MenuItem>
            <MenuItem value="RESIDENCIAL">Residencial</MenuItem>
            <MenuItem value="COMERCIAL">Comercial</MenuItem>
            <MenuItem value="TERRENO">Terreno</MenuItem>
          </FilterSelect>
        </FormControl>
      </FilterSelectWrapper>

      <FilterFieldPrice
        label="Preço mínimo"
        size="small"
        type="number"
        value={filters.minPrice}
        onChange={(e) => handleChange("minPrice", e.target.value)}
        slotProps={{
          input: {
            startAdornment: (
              <InputAdornment position="start">
                <Typography variant="caption" color="text.secondary">
                  R$
                </Typography>
              </InputAdornment>
            ),
          },
        }}
      />

      <FilterFieldPrice
        label="Preço máximo"
        size="small"
        type="number"
        value={filters.maxPrice}
        onChange={(e) => handleChange("maxPrice", e.target.value)}
        slotProps={{
          input: {
            startAdornment: (
              <InputAdornment position="start">
                <Typography variant="caption" color="text.secondary">
                  R$
                </Typography>
              </InputAdornment>
            ),
          },
        }}
      />

      <FilterFieldBedrooms
        label="Mín. quartos"
        size="small"
        type="number"
        value={filters.minBedrooms}
        onChange={(e) => handleChange("minBedrooms", e.target.value)}
        slotProps={{ htmlInput: { min: 0 } }}
      />

      <FilterSelectWrapper>
        <FormControl size="small" fullWidth>
          <InputLabel>Ordenar por</InputLabel>
          <FilterSelect
            label="Ordenar por"
            value={filters.sort}
            onChange={(e) => handleChange("sort", e.target.value as string)}
          >
            <MenuItem value="id">Padrão</MenuItem>
            <MenuItem value="value,asc">Menor preço</MenuItem>
            <MenuItem value="value,desc">Maior preço</MenuItem>
            <MenuItem value="area,asc">Menor área</MenuItem>
            <MenuItem value="area,desc">Maior área</MenuItem>
            <MenuItem value="bedrooms,desc">Mais quartos</MenuItem>
          </FilterSelect>
        </FormControl>
      </FilterSelectWrapper>

      {hasActiveFilters && (
        <FilterActions>
          <ClearButton
            variant="outlined"
            color="inherit"
            size="small"
            startIcon={<FilterListOffIcon />}
            onClick={handleClear}
          >
            Limpar
          </ClearButton>
        </FilterActions>
      )}
    </FilterContainer>
  );
}
