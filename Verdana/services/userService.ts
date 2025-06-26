import axiosInstance from "./api";

export const getAllUser = async () => {
    return await axiosInstance.get('/users').then((response) => response.data)
}

export const getUserById = async (id: number) => {
    return await axiosInstance.get(`/users/${id}`).then((response) => response.data)
}

export const updateMyUser = async (dataToModify: string, data: string) => {
        await axiosInstance.put('/users/updatemyuser', {
            [dataToModify]: data
        }
    )
}