import { useQuery } from "@tanstack/react-query";
import { propertyService } from "../services/propertyService";
import type { PropertyFilters } from "../interfaces/property-data";

export const useProperties = (filters: PropertyFilters) => {
  return useQuery({
    queryKey: ["properties", filters],
    queryFn: () => propertyService.list(filters),
    placeholderData: (prev: any) => prev,
  });
};
