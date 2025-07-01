import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SensorData } from './entities/sensor-data.entity';
import { CreateSensorDataDto } from './dto/create-sensor-data.dto';

@Injectable()
export class SensorDataService {
  constructor(
    @InjectRepository(SensorData)
    private repo: Repository<SensorData>,
  ) {}

  create(dto: CreateSensorDataDto) {
    const data = this.repo.create(dto);
    return this.repo.save(data);
  }

  findAll() {
    return this.repo.find({ order: { timestamp: 'DESC' } });
  }

  findOne(id: number) {
    return this.repo.findOneBy({ id });
  }
}
