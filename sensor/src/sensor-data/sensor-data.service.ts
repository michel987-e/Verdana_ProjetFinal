import { Injectable } from '@nestjs/common';
import { CreateSensorDataDto } from './dto/create-sensor-datum.dto';
import { UpdateSensorDatumDto } from './dto/update-sensor-datum.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { SensorData } from './entities/sensor-datum.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SensorDataService {
  constructor(
    @InjectRepository(SensorData)
    private sensorRepository: Repository<SensorData>,
  ) {}

  async create(createSensorDataDto: CreateSensorDataDto): Promise<SensorData> {
    const sensor = this.sensorRepository.create(createSensorDataDto);
    return this.sensorRepository.save(sensor);
  }

  async findAll(): Promise<SensorData[]> {
    return this.sensorRepository.find();
  }

  async findOne(id: number): Promise<SensorData | undefined> {
    return this.sensorRepository.findOne({ where: { id } });
  }

  async update(id: number, updateUserDto: UpdateSensorDatumDto): Promise<SensorData> {
    await this.sensorRepository.update(id, updateUserDto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.sensorRepository.delete(id);
  }
}
