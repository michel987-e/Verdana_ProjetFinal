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

export interface JwtPayload {
    email: string;
    sub: number;
    iat: number;
    exp: number;
}
export interface ValidateResponse {
    valid: boolean;
    payload: JwtPayload;
}