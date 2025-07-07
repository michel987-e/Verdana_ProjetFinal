import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SensorDataModule } from './sensor-data/sensor-data.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { join } from 'path';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('POSTGRES_HOST'),
        port: parseInt(configService.get('POSTGRES_PORT')),
        username: configService.get('POSTGRES_USER'),
        password: configService.get('POSTGRES_PASSWORD'),
        database: configService.get('POSTGRES_DB'),
        entities: [join(process.cwd(), 'dist/**/*.entity.ts')],
        autoLoadEntities: true,
        synchronize: true,
      }),
    }),
    SensorDataModule
  ],
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule {}

