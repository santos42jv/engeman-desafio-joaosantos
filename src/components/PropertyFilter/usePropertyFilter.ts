import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";

export type PropertyType = "RESIDENCIAL" | "COMERCIAL" | "";

export interface FilterState {
  name: string;
  type: PropertyType;
  minPrice: string;
  maxPrice: string;
  minBedrooms: string;
  sort: string;
}

export const usePropertyFilter = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const filtersFromUrl: FilterState = {
    name: searchParams.get("name") ?? "",
    type: (searchParams.get("type") as PropertyType) ?? "",
    minPrice: searchParams.get("minPrice") ?? "",
    maxPrice: searchParams.get("maxPrice") ?? "",
    minBedrooms: searchParams.get("minBedrooms") ?? "",
    sort: searchParams.get("sort") ?? "id",
  };

  const [nameInput, setNameInput] = useState(filtersFromUrl.name);

  useEffect(() => {
    setNameInput(filtersFromUrl.name);
  }, [filtersFromUrl.name]);

  const applyToUrl = (patch: Partial<FilterState>) => {
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);

      const setOrDelete = (key: string, value: string | undefined) => {
        if (value) next.set(key, value);
        else next.delete(key);
      };

      if (patch.name !== undefined) setOrDelete("name", patch.name);
      if (patch.type !== undefined) setOrDelete("type", patch.type);
      if (patch.minPrice !== undefined) setOrDelete("minPrice", patch.minPrice);
      if (patch.maxPrice !== undefined) setOrDelete("maxPrice", patch.maxPrice);
      if (patch.minBedrooms !== undefined)
        setOrDelete("minBedrooms", patch.minBedrooms);
      if (patch.sort !== undefined)
        setOrDelete("sort", patch.sort === "id" ? "" : patch.sort);

      next.set("page", "1");
      return next;
    });
  };

  const handleChange = (field: keyof FilterState, value: string) => {
    if (field === "name") {
      setNameInput(value);
      if (debounceRef.current) clearTimeout(debounceRef.current);
      debounceRef.current = setTimeout(() => applyToUrl({ name: value }), 500);
    } else {
      applyToUrl({ [field]: value });
    }
  };

  const handleClear = () => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    setNameInput("");
    setSearchParams({});
  };

  useEffect(() => {
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, []);

  const hasActiveFilters =
    filtersFromUrl.name !== "" ||
    filtersFromUrl.type !== "" ||
    filtersFromUrl.minPrice !== "" ||
    filtersFromUrl.maxPrice !== "" ||
    filtersFromUrl.minBedrooms !== "";

  return {
    filters: { ...filtersFromUrl, name: nameInput },
    handleChange,
    handleClear,
    hasActiveFilters,
  };
};
