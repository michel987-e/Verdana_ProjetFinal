import { Module } from '@nestjs/common';
import { SensorDataService } from './sensor_data.service';
import { SensorDataController } from './sensor_data.controller';

@Module({
  controllers: [SensorDataController],
  providers: [SensorDataService],
})
export class SensorDataModule {}
