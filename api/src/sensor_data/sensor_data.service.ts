import { Injectable } from '@nestjs/common';
import { CreateSensorDataDto } from './dto/create-sensor_data.dto';
import { UpdateSensorDataDto } from './dto/update-sensor_data.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SensorData } from './entities/sensor_data.entity';

@Injectable()
export class SensorDataService {
  constructor(
    @InjectRepository(SensorData)
    private sensorDataRepository: Repository<SensorData>
  ) {}

  async create(createSensorDataDto: CreateSensorDataDto) {
    return await this.sensorDataRepository.save(createSensorDataDto);
  }

  async findAll() {
    return await this.sensorDataRepository.find();
  }

  async findOne(id: number) {
    return await this.sensorDataRepository.findOne({ where: { id }});
  }

  async update(id: number, updateSensorDataDto: UpdateSensorDataDto) {
    const res = await this.sensorDataRepository.update(id, updateSensorDataDto);
    return res;
  }

  async remove(id: number) {
    const sensorDataToDelete = await this.findOne(id);
    if (sensorDataToDelete) {
      return await this.sensorDataRepository.remove(sensorDataToDelete);
    };
  }
}
