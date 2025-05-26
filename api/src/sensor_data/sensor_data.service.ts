import { Injectable } from '@nestjs/common';
import { CreateSensorDatumDto } from './dto/create-sensor_datum.dto';
import { UpdateSensorDatumDto } from './dto/update-sensor_datum.dto';

@Injectable()
export class SensorDataService {
  create(createSensorDatumDto: CreateSensorDatumDto) {
    return 'This action adds a new sensorDatum';
  }

  findAll() {
    return `This action returns all sensorData`;
  }

  findOne(id: number) {
    return `This action returns a #${id} sensorDatum`;
  }

  update(id: number, updateSensorDatumDto: UpdateSensorDatumDto) {
    return `This action updates a #${id} sensorDatum`;
  }

  remove(id: number) {
    return `This action removes a #${id} sensorDatum`;
  }
}
