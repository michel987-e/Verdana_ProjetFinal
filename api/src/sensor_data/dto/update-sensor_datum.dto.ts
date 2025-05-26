import { PartialType } from '@nestjs/mapped-types';
import { CreateSensorDatumDto } from './create-sensor_datum.dto';

export class UpdateSensorDatumDto extends PartialType(CreateSensorDatumDto) {}
