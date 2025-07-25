export enum ECountryCode {
  FR = "FR",
  US = "US",
  DE = "DE",
  JP = "JP"
}

export interface IUser {
    id: number,
    email: string,
    name: string | null,
    city: string | null,
    country: ECountryCode | string
}

export interface IFlower {
    id: number,
    user_id: number,
    name: string,
    plant_type: string,
    location: string,
    temp_min: number,
    temp_max: number,
    humidity_min: number,
    humidity_max: number,
    soil_min: number,
    soil_max: number,
    light_min: number,
    light_max: number,
    image?: number,
}

export interface ISensor {
    id: number,
    flower_id: number,
    temperature: number,
    light: number,
    soil: number
}