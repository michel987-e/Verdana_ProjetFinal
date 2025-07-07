import { IsString, IsNotEmpty, IsOptional, IsNumber } from 'class-validator';

export class CreateSensorDataDto {
  @IsNumber()
  @IsNotEmpty()
  flower_id!: number;

  @IsNumber()
  @IsNotEmpty()
  temperature!: number;

  @IsNumber()
  @IsNotEmpty()
  humidity!: number;

  @IsNumber()
  @IsNotEmpty()
  soil!: number;

  @IsNumber()
  @IsNotEmpty()
  light!: number;
}