import type { ResourceFeatureCollection } from '@/assets/interfaces';
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

export const getInfoFromOpenStreetMap = async ({ lat, lon }: { lat: number, lon: number }) => {
  console.log(lat, lon);
  const response = await 
  axios.get(`https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json`)
return response.data;
}