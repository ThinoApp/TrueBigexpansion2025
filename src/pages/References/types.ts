export interface Reference {
  id: number;
  lat: number;
  long: number;
  title: string;
  lieu: string;
  travaux: string[];
  prix: string;
  annee: number | string;
  superficie: string;
  country: string;
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
  countryGroup: string;
  country: string;
  lieu?: string;
}

export interface GlobePoint {
  lat: number;
  lng: number;
  size: number;
  color: string;
  altitude: number;
  data: Reference;
}
