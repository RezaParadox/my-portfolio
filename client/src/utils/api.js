import axios from 'axios';

const isLocalhost =
  window.location.hostname === 'localhost' ||
  window.location.hostname === '127.0.0.1';

const api = axios.create({
  baseURL: isLocalhost ? 'http://localhost:3000/api' : '/api'
});

// Add auth token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle auth errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;
