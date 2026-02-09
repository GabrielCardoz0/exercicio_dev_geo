import type { IMarker, INewMarkerPayload, ResourceFeatureCollection } from '@/assets/interfaces';
import type { OpenStreetMapFeature } from '@/components/NewMarkerPopup';
import { API_URL } from '@/variables';
import axios from 'axios';

const api = axios.create({
  baseURL: API_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export const getResourcesData = async (): Promise<ResourceFeatureCollection> => {
  const response = await api.get('/resources');
  return response.data;
}

export const createMarkerApi = async (osmData: OpenStreetMapFeature) => {

  const payload: INewMarkerPayload = {
    lat: Number(osmData.lat),
    lon: Number(osmData.lon),
    display_name: osmData.display_name,
    place_id: osmData.place_id,
    address: osmData.address
      ? {
          building: osmData.address.building,
          city: osmData.address.city ?? osmData.address.town,
          state: osmData.address.state,
          country: osmData.address.country,
          postcode: osmData.address.postcode,
        }
      : undefined,
  }

  const response = await api.post('/markers', payload);
  return response.data;
}

export const getMarkers = async (): Promise<IMarker[]> => {
  const response = await api.get('/markers');
  return response.data;
}

export const deleteMarker = async (id: number) => {
  const response = await api.delete(`/markers/${id}`);
  return response.data;
}

export const getInfoFromOpenStreetMap = async ({ lat, lon }: { lat: number, lon: number }) => {
  const response = await 
  axios.get(`https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json`)
return response.data;
}