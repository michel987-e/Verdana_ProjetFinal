import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FlowersModule } from './flowers/flowers.module';
import { UsersModule } from './users/users.module';
import { SensorDataModule } from './sensor_data/sensor_data.module';
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
        host: configService.get('DB_HOST'),
        port: parseInt(configService.get('DB_PORT')),
        username: configService.get('DB_USER'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_DATABASE'),
        ssl: {
          ca: configService.get('DB_CA'),
          rejectUnauthorized: true,
        },
        entities: [join(process.cwd(), 'dist/**/*.entity.ts')],
        autoLoadEntities: true,
        synchronize: true,
      }),
    }),
    FlowersModule,
    UsersModule,
    SensorDataModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
