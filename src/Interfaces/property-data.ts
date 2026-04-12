export interface PropertyData {
  id: number;
  name: string;
  description: string;
  type: string;
  value: number;
  area: number;
  bedrooms: number;
  address: string;
  city: string;
  state: string;
  active: boolean;
  brokerId: number;
  brokerName: string;
  imageUrls: string;
}

export interface PropertyFilters {
  name?: string;
  type?: string;
  minPrice?: number;
  maxPrice?: number;
  minBedrooms?: number;
  page?: number;
  size?: number;
  sort?: string;
}

export interface PropertyPage {
  content: PropertyData[];
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
}
