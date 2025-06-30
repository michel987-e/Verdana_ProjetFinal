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
    })
}

export const loginUser = async (email: string, password: string) => {
    return await api.post('/users/auth/login', {
        email: email,
        password: password
    })
    .then((response) => response.data)
    .catch((err) => console.log(err))
}

export const logoutUser = async () => {
    return await api.post('/users/auth/logout')
    .then((response) => response.data)
    .catch((err) => console.log(err))
}