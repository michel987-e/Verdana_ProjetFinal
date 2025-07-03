import { IsString, IsNotEmpty, IsOptional, IsNumber } from 'class-validator';

export class CreateSensorDataDto {
  @IsString()
  @IsNotEmpty()
  sensor_name!: string;

  @IsNumber()
  value!: number;

  @IsOptional()
  @IsString()
  unit?: string;
}