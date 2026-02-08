import type { GeoJsonProperties } from "geojson";

interface GeoJSONFeature<T = GeoJsonProperties> {
  type: "Feature";
  geometry: {
    type: "Point";
    coordinates: [number, number];
  };
  properties: T;
}

interface GeoJSONFeatureCollection<T = GeoJSONFeature> {
  type: "FeatureCollection";
  features: T[];
}

interface AddressProperties {
  "place_id": 123456,
  "display_name": "Empire State Building, New York, NY, USA",
  "building": "Empire State Building",
  "city": "New York",
  "state": "NY",
  "country": "United States",
  "postcode": "10118"
}

export interface ResourceProperties {
  id: number;
  estabelecimento_outras_finalidades?: number;
  domicilio_particular?: number;
  estabelecimento_construcao?: number;
  estabelecimento_religioso?: number;
  estabelecimento_ensino?: number;
  estabelecimento_saude?: number;
  domicilio_coletivo?: number;
  estabelecimento_agro?: number;
  address?: AddressProperties;
}

export type ResourceFeature = GeoJSONFeature<ResourceProperties>;

export type ResourceFeatureCollection = GeoJSONFeatureCollection<ResourceFeature>;



export interface IUser {
  id: number;
  name: string;
  email: string;
  created_at: string;
  updated_at: string;
}


export interface AuthContextType {
  user: IUser | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
}

