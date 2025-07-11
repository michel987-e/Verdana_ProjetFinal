import api from "./api"
import { LoginReponse, LogoutResponse, RegisterReponse, ValidateResponse } from "./responseInterface"
import { deleteSecureItem, saveSecureItem } from "./secureStore"

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

export const deleteAccount = async (id: number) => {
    try {
        const responseUser = await api.delete(`/users/${id}`)
        const responseFlower = await api.delete(`/flower/users/${id}`)
        const responseSensor = await api.delete(`/sensor/users/${id}`)

        return [responseUser.data, responseFlower.data, responseSensor.data]
    } catch (err: any) {
        let message = "Erreur lors de la suppression du compte."
        if (err.response?.data?.message) {
            message = err.response.data.message
        }  
        throw new Error(message);
    }
}

export const changePassword = async (oldPassword: string, newPassword: string) => {
    try {
        const response = await api.put('/users/change-password', {
            oldPassword: oldPassword,
            newPassword: newPassword,
        })
        return response.data
    } catch (err : any) {
        let message = "Erreur lors de la modification du mot de passe."
        if (err.response?.data?.message) {
            message = err.response.data.message
        }  
        throw new Error(message);
    }
}
