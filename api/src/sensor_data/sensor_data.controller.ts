import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SensorDataService } from './sensor_data.service';
import { CreateSensorDatumDto } from './dto/create-sensor_datum.dto';
import { UpdateSensorDatumDto } from './dto/update-sensor_datum.dto';

@Controller('sensor-data')
export class SensorDataController {
  constructor(private readonly sensorDataService: SensorDataService) {}

  @Post()
  create(@Body() createSensorDatumDto: CreateSensorDatumDto) {
    return this.sensorDataService.create(createSensorDatumDto);
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
  update(@Param('id') id: string, @Body() updateSensorDatumDto: UpdateSensorDatumDto) {
    return this.sensorDataService.update(+id, updateSensorDatumDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.sensorDataService.remove(+id);
  }
}
