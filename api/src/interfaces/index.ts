import { Request } from "express";

export interface IUser {
  id: number;
  created_at: Date;
  updated_at: Date;
  name: string;
  email: string;
  password: string;
}

export interface IMarker {
  id: number;
  created_at: Date;
  updated_at: Date;
  place_id: number;
  lat: number;
  lon: number;
  display_name: string;
  building: string;
  city: string;
  state: string;
  country: string;
  postcode: string;
  user_id: number;
}

export interface IOSMInput {
  place_id: number,
  lat: string,
  lon: string,
  display_name: string,
  address: {
      building: string,
      city: string,
      state: string,
      country: string,
      postcode: string | number
  }
}

export type AuthenticatedRequest = Request & { user?: IUser };

export type JWTPayload = {
  userId: number;
};