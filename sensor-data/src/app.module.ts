import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { SensorDataModule } from './sensor-datas/sensor-data.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST || 'sensor-db',
      port: Number(process.env.DB_PORT) || 5432,
      username: process.env.DB_USER || 'verdana',
      password: process.env.DB_PASSWORD || 'secret',
      database: process.env.DB_NAME || 'verdana_db',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: process.env.NODE_ENV !== 'production',
    }),
    SensorDataModule,
  ],
})
export class AppModule {}

