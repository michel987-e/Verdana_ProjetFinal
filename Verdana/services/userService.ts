import api from "./api"

export const getAllUser = async () => {
    return await api.get('/users').then((response) => response.data)
}

export const getUserById = async (id: number) => {
    return await api.get(`/users/${id}`).then((response) => response.data)
}

export const updateMyUser = async (dataToModify: string, data: string) => {
        await api.put('/users/updatemyuser', {
            [dataToModify]: data
        }
    )
}