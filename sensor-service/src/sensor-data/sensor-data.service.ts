import { Injectable } from '@nestjs/common';
import { CreateSensorDataDto } from './dto/create-sensor-datum.dto';
import { UpdateSensorDatumDto } from './dto/update-sensor-datum.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { SensorData } from './entities/sensor-datum.entity';
import { Repository } from 'typeorm';
import { producer } from '../../kafka/producer';

@Injectable()
export class SensorDataService {
  constructor(
    @InjectRepository(SensorData)
    private sensorRepository: Repository<SensorData>,
  ) {}

  async create(createSensorDataDto: CreateSensorDataDto): Promise<SensorData> {
    const sensor = this.sensorRepository.create(createSensorDataDto);
    const saved = this.sensorRepository.save(sensor);

    try {
      await producer.send({
        topic: 'sensor-data',
        messages: [
          {
            key: String((await saved).flower_id),
            value: JSON.stringify({
              id: (await saved).id,
              flower_id: (await saved).flower_id,
              temperature: (await saved).temperature,
              humidity: (await saved).humidity,
              soil: (await saved).soil,
              light: (await saved).light,
              timestamp: (await saved).timestamp,
            }),
          },
        ],
      });
    } catch (err) {
      if (err.message.includes('disconnected')) {
        await producer.connect();
        await producer.send({
          topic: 'sensor-data',
          messages: [
            {
              key: String((await saved).flower_id),
              value: JSON.stringify({
                id: (await saved).id,
                flower_id: (await saved).flower_id,
                temperature: (await saved).temperature,
                humidity: (await saved).humidity,
                soil: (await saved).soil,
                light: (await saved).light,
                timestamp: (await saved).timestamp,
              }),
            },
          ],
        });
      } else {
        throw err;
      }
    }
    return saved;
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
