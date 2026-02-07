import type { GeoJsonProperties } from "geojson";

export interface GeoJSONFeature<T = GeoJsonProperties> {
  type: "Feature";
  geometry: {
    type: "Point";
    coordinates: [number, number];
  };
  properties: T;
}

export interface GeoJSONFeatureCollection<T = GeoJSONFeature> {
  type: "FeatureCollection";
  features: T[];
}

export interface ResourceProperties {
  id: number;
  estab?: number;
  dom?: number;
  const?: number;
  reli?: number;
  ensino?: number;
  saude?: number;
  dom_col?: number;
  estab_agro?: number;
}

export type ResourceFeature = GeoJSONFeature<ResourceProperties>;

export type ResourceFeatureCollection = GeoJSONFeatureCollection<ResourceFeature>;
