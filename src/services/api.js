import axios from 'axios';

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'https://healthyhabits-backend.onrender.com/api'
});

// Ensure auth token is sent on every request
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('hh_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

