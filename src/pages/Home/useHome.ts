import { useCallback, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useProperties } from "../../hooks/useProperties";

const PAGE_SIZE = 12;

export const useHome = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [page, setPage] = useState(Number(searchParams.get("page") ?? 1));

  const filters = {
    name: searchParams.get("name") ?? undefined,
    type: searchParams.get("type") ?? undefined,
    minPrice: searchParams.get("minPrice")
      ? Number(searchParams.get("minPrice"))
      : undefined,
    maxPrice: searchParams.get("maxPrice")
      ? Number(searchParams.get("maxPrice"))
      : undefined,
    minBedrooms: searchParams.get("minBedrooms")
      ? Number(searchParams.get("minBedrooms"))
      : undefined,
    sort: searchParams.get("sort") ?? "id",
    page: page - 1,
    size: PAGE_SIZE,
  };

  const { data, isLoading, isError } = useProperties(filters);

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

  return {
    properties: data?.content ?? [],
    totalPages: data?.totalPages ?? 1,
    totalElements: data?.totalElements ?? 0,
    page,
    isLoading,
    isError,
    handlePageChange,
  };
};
