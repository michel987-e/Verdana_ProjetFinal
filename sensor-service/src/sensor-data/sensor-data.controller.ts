import { Controller, Get, Post, Body, Param, Delete, Put, UseGuards, HttpCode, HttpStatus, Req } from '@nestjs/common';
import { SensorDataService } from './sensor-data.service';
import { CreateSensorDataDto } from './dto/create-sensor-datum.dto';
import { UpdateSensorDatumDto } from './dto/update-sensor-datum.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('sensor')
export class SensorDataController {
  constructor(private readonly sensorDataService: SensorDataService) {}

  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.CREATED)
  @Post()
  create(@Body() createSensorDatumDto: CreateSensorDataDto) {
    return this.sensorDataService.create(createSensorDatumDto);
  }

  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  @Get('/')
  findAll(@Req() req) {
    console.log(req.user)
    return this.sensorDataService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.sensorDataService.findOne(+id);
  }

  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  @Put(':id')
  update(@Param('id') id: string, @Body() updateSensorDatumDto: UpdateSensorDatumDto) {
    return this.sensorDataService.update(+id, updateSensorDatumDto);
  }

  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.sensorDataService.remove(+id);
  }
}
