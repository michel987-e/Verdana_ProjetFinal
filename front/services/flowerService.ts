import api from "./api"

export const getAllFlower = async () => {
    return await api.get('/flower').then((response) => response.data)
}

export const getFlowerByUserID = async (id: number) => {
    return await api.get(`/flower/user/${id}`).then((response) => response.data)
}