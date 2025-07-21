import api from "./api";

export const pushToken = async (userId: number, token: string) => {
    try {
        const response = await api.post('/recommendation/push-token', {
            userId,
            expoPushToken: token
        })
        return response.data;
    } catch (err: any) {
        let message = "Erreur lors l'envoie du token."
        if (err.response?.data?.message) {
            message = err.response.data.message
        }  
        throw new Error(message);
    }
};