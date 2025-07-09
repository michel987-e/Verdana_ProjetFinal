import { IsEmail, IsEnum, IsNotEmpty, IsString, MinLength } from "class-validator";
import { CountryCode } from "../countryCode";

export class CreateUserDto {
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @IsString()
    @MinLength(8)
    password: string;

    @IsString()
    name?: string;

    @IsString()
    city?: string;

    @IsEnum(CountryCode)
    country?: CountryCode;
}
