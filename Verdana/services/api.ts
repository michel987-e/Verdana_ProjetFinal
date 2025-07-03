import axios from 'axios';
import CookieManager from '@react-native-cookies/cookies';
import Toast from 'react-native-toast-message';

const config = {
 baseURL: 'http://localhost:80',
 domain: 'localhost',
};

const api = axios.create({
 baseURL: config.baseURL,
 withCredentials: true,
});

api.interceptors.response.use(
  async (response) => {
    const setCookieHeader =
      response.headers['set-cookie'] || response.headers['Set-Cookie'];
    if (setCookieHeader?.[0]) {
      await CookieManager.setFromResponse('http://localhost:80', setCookieHeader[0]);
    }
    return response;
  },
  async (error) => {
    if (error.response?.status === 401) {
        Toast.show({
            type: 'error',
            text1: 'Expired',
            text2: 'Please reconnect'
        });
        //Navigation to login
    }
    return Promise.reject(error);
  }
);

export default api;
