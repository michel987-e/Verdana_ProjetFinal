import { PartialType } from '@nestjs/mapped-types';
import { CreateSensorDataDto } from './create-sensor_data.dto';

export class UpdateSensorDataDto extends PartialType(CreateSensorDataDto) {}
