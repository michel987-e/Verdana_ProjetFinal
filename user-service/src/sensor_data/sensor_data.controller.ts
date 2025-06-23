import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SensorDataService } from './sensor_data.service';
import { CreateSensorDataDto } from './dto/create-sensor_data.dto';
import { UpdateSensorDataDto } from './dto/update-sensor_data.dto';

@Controller('sensor-data')
export class SensorDataController {
  constructor(private readonly sensorDataService: SensorDataService) {}

  @Post()
  create(@Body() createSensorDataDto: CreateSensorDataDto) {
    return this.sensorDataService.create(createSensorDataDto);
  }

  @Get()
  findAll() {
    return this.sensorDataService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.sensorDataService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSensorDataDto: UpdateSensorDataDto) {
    return this.sensorDataService.update(+id, updateSensorDataDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.sensorDataService.remove(+id);
  }
}
