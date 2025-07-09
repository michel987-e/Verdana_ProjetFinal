import api from "./api"
import { LoginReponse, LogoutResponse, RegisterReponse } from "./responseInterface"

export const getAllUser = async () => {
    return await api.get('/users').then((response) => response.data)
}

export const getUserById = async (id: number) => {
    return await api.get(`/users/${id}`).then((response) => response.data)
}

export const updateMyUser = async (dataToModify: string, data: string) => {
    await api.put('/users/updatemyuser', {
        [dataToModify]: data
    })
}

export const loginUser = async (email: string, password: string): Promise<LoginReponse> => {
    try {
        const response = await api.post('/users/auth/login', {
            email: email,
            password: password
        })
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
        })
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
        const response = await api.post('/users/auth/logout')
        return response.data;
    } catch (err: any) {
        let message = "Erreur lors de la deconnexion."
        if (err.response?.data?.message) {
            message = err.response.data.message
        }
        throw new Error(message);
    }
}
