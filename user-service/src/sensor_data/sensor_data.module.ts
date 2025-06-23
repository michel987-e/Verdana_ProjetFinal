import { Module } from '@nestjs/common';
import { SensorDataService } from './sensor_data.service';
import { SensorDataController } from './sensor_data.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SensorData } from './entities/sensor_data.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SensorData])],
  controllers: [SensorDataController],
  providers: [SensorDataService],
})
export class SensorDataModule {}
