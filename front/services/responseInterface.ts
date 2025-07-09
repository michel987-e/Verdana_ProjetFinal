import { IUser } from "../interfaces";

export interface LoginReponse {
    message: string;
    token: string;
}

export interface RegisterReponse {
    message: string;
    user: IUser;
}

export interface LogoutResponse {
    message: string;
}