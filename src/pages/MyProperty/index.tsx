import {
  Typography,
  Button,
  Skeleton,
  Pagination,
  Chip,
  IconButton,
  Tooltip,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import PowerSettingsNewIcon from "@mui/icons-material/PowerSettingsNew";
import HouseOutlinedIcon from "@mui/icons-material/HouseOutlined";

import { useMyProperty } from "./useMyProperty";
import PropertyFormModal from "../../components/PropertyFormModal";
import type { PropertyData } from "../../interfaces/property-data";

import {
  PageSection,
  PageHeader,
  HeaderActions,
  PropertyTable,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  PropertyImage,
  ActionGroup,
  SkeletonWrapper,
  EmptyState,
  PaginationWrapper,
  StatusChipWrapper,
} from "./style";

export default function MyProperty() {
  const {
    properties,
    isLoading,
    isError,
    page,
    totalPages,
    totalElements,
    isAdmin,
    togglingId,
    deletingId,
    isModalOpen,
    editingProperty,
    handleOpenCreate,
    handleOpenEdit,
    handleCloseModal,
    handleSave,
    handleToggleStatus,
    handleDelete,
    handlePageChange,
  } = useMyProperty();

  return (
    <PageSection>
      <PageHeader>
        <div>
          <Typography variant="h5" sx={{ fontWeight: 600 }} color="primary">
            {isAdmin ? "Todos os Imóveis" : "Minhas Propriedades"}
          </Typography>
          {!isLoading && (
            <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
              {totalElements} imóvel(is){" "}
              {isAdmin ? "cadastrado(s) na plataforma" : "cadastrado(s)"}
            </Typography>
          )}
        </div>

        <HeaderActions>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={handleOpenCreate}
          >
            Novo imóvel
          </Button>
        </HeaderActions>
      </PageHeader>

      {isError && (
        <Typography color="error" sx={{ mb: 2 }}>
          Erro ao carregar propriedades. Tente novamente.
        </Typography>
      )}

      {isLoading ? (
        <SkeletonWrapper>
          {Array.from({ length: 5 }).map((_, i) => (
            <Skeleton
              key={i}
              variant="rectangular"
              height={64}
              sx={{ borderRadius: 1 }}
            />
          ))}
        </SkeletonWrapper>
      ) : properties.length === 0 ? (
        <EmptyState>
          <HouseOutlinedIcon sx={{ fontSize: 56, color: "lightgray" }} />
          <Typography variant="body1" color="text.secondary">
            {isAdmin
              ? "Nenhum imóvel cadastrado na plataforma."
              : "Você ainda não possui imóveis cadastrados."}
          </Typography>
          <Button
            variant="outlined"
            startIcon={<AddIcon />}
            onClick={handleOpenCreate}
          >
            Cadastrar primeiro imóvel
          </Button>
        </EmptyState>
      ) : (
        <PropertyTable>
          <TableHead>
            <TableRow header isAdmin={isAdmin}>
              <TableCell>Imóvel</TableCell>
              <TableCell>Tipo</TableCell>
              <TableCell>Localização</TableCell>
              <TableCell>Valor</TableCell>
              <TableCell>Quartos / Área</TableCell>
              {isAdmin && <TableCell>Corretor</TableCell>}
              <TableCell>Status</TableCell>
              <TableCell align="right">Ações</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {properties.map((property: PropertyData) => {
              const firstImage = property.imageUrls?.split(",")[0] ?? "";
              const formattedValue = property.value.toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
              });

              return (
                <TableRow key={property.id} isAdmin={isAdmin}>
                  <TableCell>
                    <div
                      style={{ display: "flex", alignItems: "center", gap: 12 }}
                    >
                      <PropertyImage src={firstImage} alt={property.name} />
                      <Typography variant="body2" sx={{ fontWeight: 500 }}>
                        {property.name}
                      </Typography>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2">
                      {property.type.charAt(0) +
                        property.type.slice(1).toLowerCase()}
                    </Typography>
                  </TableCell>
                  <TableCell >
                    <Typography variant="body2">
                      {property.city}, {property.state}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2" sx={{ fontWeight: 500 }}>
                      {formattedValue}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2">
                      {property.bedrooms} qts · {property.area} m²
                    </Typography>
                  </TableCell>
                  {isAdmin && (
                    <TableCell>
                      <Typography variant="body2" color="text.secondary">
                        {property.brokerName ?? "—"}
                      </Typography>
                    </TableCell>
                  )}
                  <TableCell>
                    <StatusChipWrapper>
                      <Chip
                        label={property.active ? "Ativo" : "Inativo"}
                        color={property.active ? "success" : "default"}
                        size="small"
                      />
                    </StatusChipWrapper>
                  </TableCell>
                  <TableCell align="right">
                    <ActionGroup>
                      <Tooltip title="Editar">
                        <IconButton
                          size="small"
                          onClick={() => handleOpenEdit(property)}
                        >
                          <EditIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>

                      <Tooltip title={property.active ? "Desativar" : "Ativar"}>
                        <IconButton
                          size="small"
                          color={property.active ? "warning" : "success"}
                          disabled={togglingId === property.id}
                          onClick={() => handleToggleStatus(property.id)}
                        >
                          <PowerSettingsNewIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>

                      <Tooltip title="Deletar">
                        <IconButton
                          size="small"
                          color="error"
                          disabled={deletingId === property.id}
                          onClick={() => handleDelete(property.id)}
                        >
                          <DeleteIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                    </ActionGroup>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </PropertyTable>
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

      <PropertyFormModal
        open={isModalOpen}
        onClose={handleCloseModal}
        onSave={handleSave}
        initialData={editingProperty}
      />
    </PageSection>
  );
}
