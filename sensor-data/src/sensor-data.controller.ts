import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { SensorDataService } from './sensor-data.service';
import { CreateSensorDataDto } from './dto/create-sensor-data.dto';

@Controller('sensor-data')
export class SensorDataController {
  constructor(private readonly service: SensorDataService) {}

  @Post()
  create(@Body() dto: CreateSensorDataDto) {
    return this.service.create(dto);
  }

  @Get()
  findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.service.findOne(+id);
  }
}
