import { IsEmail, IsEnum, IsNotEmpty, IsString, MinLength } from "class-validator";
import { CountryCode } from "../countryCode";

export class CreateUserDto {
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsString()
    @MinLength(8)
    password: string;

    @IsNotEmpty()
    city: string;

    @IsNotEmpty()
    @IsEnum(CountryCode)
    country: CountryCode;
}
