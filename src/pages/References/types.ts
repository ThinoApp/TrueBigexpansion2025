export interface Reference {
  id: number;
  name: string;
  location: string;
  description: string;
  mission: string;
  total_area_m2: number;
  built_area_m2: number;
  year: number;
  cost_eur_ht: number;
  moa_contact: string;
  category?: string; // To store the category (terrains_synthetiques, terrains_naturels, etc.)
  page?: number; // Numéro de page dans le catalogue
}

export interface Arc {
  startLat: number;
  startLng: number;
  endLat: number;
  endLng: number;
  color: string;
}

export interface Filters {
  type: string[];
  year: number | null;
  location: string;
  minPrice: number | null;
  maxPrice: number | null;
  projectType: string;
  category: string;
}

export interface GlobePoint {
  lat: number;
  lng: number;
  size: number;
  color: string;
  altitude: number;
  data: Reference;
}
