import { useCallback, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { api } from "../../services/api";
import { useUser } from "../../context/UserContext";
import type { PropertyData } from "../../interfaces/property-data";

const PAGE_SIZE = 10;

const fetchMyProperties = async (): Promise<PropertyData[]> => {
  const { data } = await api.get("/api/property/getUserProperties");
  return data;
};

const fetchAllProperties = async (): Promise<PropertyData[]> => {
  let page = 0;
  let allItems: PropertyData[] = [];

  while (true) {
    const { data } = await api.get("/api/property", {
      params: { page, size: 100, sort: "id" },
    });
    allItems = [...allItems, ...data.content];
    if (page >= data.totalPages - 1) break;
    page++;
  }

  return allItems;
};

export const useMyProperty = () => {
  const queryClient = useQueryClient();
  const { user } = useUser();
  const isAdmin = user?.role === "ADMIN";

  const [searchParams, setSearchParams] = useSearchParams();
  const [page, setPage] = useState(Number(searchParams.get("page") ?? 1));

  const [togglingId, setTogglingId] = useState<number | null>(null);
  const [deletingId, setDeletingId] = useState<number | null>(null);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProperty, setEditingProperty] = useState<PropertyData | null>(
    null,
  );

  const {
    data: allProperties = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["myProperties", isAdmin],
    queryFn: isAdmin ? fetchAllProperties : fetchMyProperties,
  });

  const totalElements = allProperties.length;
  const totalPages = Math.max(1, Math.ceil(totalElements / PAGE_SIZE));
  const properties = allProperties.slice(
    (page - 1) * PAGE_SIZE,
    page * PAGE_SIZE,
  );

  const handlePageChange = useCallback(
    (_: React.ChangeEvent<unknown>, value: number) => {
      setPage(value);
      setSearchParams((prev) => {
        const next = new URLSearchParams(prev);
        next.set("page", String(value));
        return next;
      });
    },
    [setSearchParams],
  );

  const handleOpenCreate = () => {
    setEditingProperty(null);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (property: PropertyData) => {
    setEditingProperty(property);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingProperty(null);
  };

  const handleSave = useCallback(async () => {
    await queryClient.invalidateQueries({ queryKey: ["myProperties"] });
    handleCloseModal();
  }, [queryClient]);

  const handleToggleStatus = useCallback(
    async (id: number) => {
      setTogglingId(id);
      try {
        await api.patch(`/api/property/status/${id}`);
        await queryClient.invalidateQueries({ queryKey: ["myProperties"] });
      } catch (err) {
        console.error("Erro ao alterar status:", err);
      } finally {
        setTogglingId(null);
      }
    },
    [queryClient],
  );

  const handleDelete = useCallback(
    async (id: number) => {
      if (!window.confirm("Tem certeza que deseja deletar este imóvel?"))
        return;
      setDeletingId(id);
      try {
        await api.delete(`/api/property/${id}`);
        await queryClient.invalidateQueries({ queryKey: ["myProperties"] });
      } catch (err) {
        console.error("Erro ao deletar imóvel:", err);
      } finally {
        setDeletingId(null);
      }
    },
    [queryClient],
  );

  return {
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
  };
};
