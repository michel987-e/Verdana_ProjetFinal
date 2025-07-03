import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { SensorDataService } from './sensor-data.service';
import { CreateSensorDataDto } from './dto/create-sensor-datum.dto';
import { UpdateSensorDatumDto } from './dto/update-sensor-datum.dto';

@Controller('sensor-data')
export class SensorDataController {
  constructor(private readonly sensorDataService: SensorDataService) {}

  @Post()
  create(@Body() createSensorDatumDto: CreateSensorDataDto) {
    return this.sensorDataService.create(createSensorDatumDto);
  }

  @Get('/')
  findAll() {
    return this.sensorDataService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.sensorDataService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateSensorDatumDto: UpdateSensorDatumDto) {
    return this.sensorDataService.update(+id, updateSensorDatumDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.sensorDataService.remove(+id);
  }
}
