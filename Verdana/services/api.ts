import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from "react-native";

const axiosInstance = axios.create({
    baseURL: "http://localhost",
    timeout: 5000,
})

axiosInstance.interceptors.request.use(
    async (config) => {
        const token = await AsyncStorage.getItem('authToken');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    }, (error) => Promise.reject(error)
);


export default axiosInstance;