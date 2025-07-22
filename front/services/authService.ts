import api from "./api"
import { LoginReponse, LogoutResponse, RegisterReponse, ValidateResponse } from "./responseInterface"
import { deleteSecureItem, saveSecureItem } from "./secureStore"

export const loginUser = async (email: string, password: string): Promise<LoginReponse> => {
    try {
        const response = await api.post('/users/auth/login', {
            email: email,
            password: password
        })
        const token = response.data.token;
        if (token) {
            await saveSecureItem('auth_token', token);
        }
        return response.data;
    } catch (err: any) {
        let message = "Erreur lors de la connexion."
        if (err.response?.data?.message) {
            message = err.response.data.message
        }  
        throw new Error(message);
    }
};

export const registerUser = async (email: string, password: string): Promise<RegisterReponse> => {
    try {
        const response = await api.post('/users/auth/register', {
            email: email,
            password: password
        });
        return response.data;
    } catch (err: any) {
        let message = "Erreur lors de l'inscription."
        if (err.response?.data?.message) {
            message = err.response.data.message
        }  
        throw new Error(message);
    }
}

export const logoutUser = async (): Promise<LogoutResponse> => {
    try {
        const response = await api.post('/users/auth/logout');
        deleteSecureItem('auth_token');
        return response.data;
    } catch (err: any) {
        let message = "Erreur lors de la deconnexion."
        if (err.response?.data?.message) {
            message = err.response.data.message
        }
        throw new Error(message);
    }
}

export const validateToken = async (): Promise<ValidateResponse> => {
    try {
        const response = await api.get('/users/auth/validate');
        return response.data;
    } catch (err: any) {
        let message = "No token"
        if (err.response?.data?.error) {
            message = err.response.data.error
        }
        throw new Error(message);
    }
}