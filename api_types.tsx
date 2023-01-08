export interface Geoapify {
  type: string;
  features: Feature[];
}

export interface Feature {
  type: FeatureType;
  properties: Properties;
  geometry: Geometry;
}

export interface Geometry {
  type: GeometryType;
  coordinates: number[];
}

export enum GeometryType {
  Point = "Point",
}

export interface Properties {
  name: string;
  country: string;
  country_code: string;
  state: string;
  county: string;
  city: string;
  municipality: string;
  postcode: string;
  suburb: string;
  quarter: string;
  street: string;
  housenumber?: string;
  lon: number;
  lat: number;
  formatted: string;
  address_line1: string;
  address_line2: string;
  categories: Category[];
  details: string[];
  datasource: Datasource;
  distance: number;
  place_id: string;
}

export enum Category {
  Catering = "catering",
  CateringCafe = "catering.cafe",
  CateringFastFood = "catering.fast_food",
  CateringRestaurant = "catering.restaurant",
}

export enum County {
  DhakaDistrict = "Dhaka District",
}

export interface Datasource {
  sourcename: string;
  attribution: string;
  license: string;
  url: string;
  raw: Raw;
}

export interface Raw {
  name?: string;
  osm_id?: number;
  amenity?: Amenity;
  osm_type?: OsmType;
  "name:en"?: string;
  "addr:street"?: string;
  "addr:postcode"?: number;
  opening_hours?: string;
  "addr:housenumber"?: string;
}

export enum Amenity {
  Cafe = "cafe",
  FastFood = "fast_food",
  Restaurant = "restaurant",
}

export enum OsmType {
  N = "n",
}

export enum FeatureType {
  Feature = "Feature",
}
