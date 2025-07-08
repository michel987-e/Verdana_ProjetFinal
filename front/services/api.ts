import axios from 'axios';
import { getSecureItem } from './secureStore';

const config = {
 baseURL: 'http://localhost:80',
 domain: 'localhost',
};

const api = axios.create({
 baseURL: config.baseURL,
 withCredentials: true,
});

api.interceptors.request.use(async (config) => {
  const token = await getSecureItem('auth_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});


export default api;
