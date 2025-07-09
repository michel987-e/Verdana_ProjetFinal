import api from "./api"
import { LoginReponse } from "./responseInterface"

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
    } catch (err) {
        console.log(err)
        throw err
    }
}

export const registerUser = async (email: string, password: string) => {
    return await api.post('users/auth/register')
    .then((response) => response.data)
    .catch((err) => alert(err))
}

export const logoutUser = async () => {
    return await api.post('/users/auth/logout')
    .then((response) => response.data)
    .catch((err) => console.log(err))
}
