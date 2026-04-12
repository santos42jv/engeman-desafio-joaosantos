import type { PropertyFilters, PropertyPage } from "../interfaces/property-data";
import { api } from "./api";

export const propertyService = {
  list: async (filters: PropertyFilters = {}): Promise<PropertyPage> => {
    const { data } = await api.get("/api/property", { params: filters });
    return data;
  },
};
