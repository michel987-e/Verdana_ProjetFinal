import axios from 'axios';
import { getSecureItem } from './secureStore';
import Constants from 'expo-constants';

const ip = Constants.expoConfig?.extra?.IP_ADDRESS;
const config = {
    baseUrl: `http://${ip || '10.0.2.2'}:80`,
//  domain: 'localhost',
};

const api = axios.create({
 baseURL: config.baseUrl,
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
