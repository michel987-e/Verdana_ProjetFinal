import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import 'reflect-metadata';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api'); 
  await app.listen(80);
  console.log(`Sensor Data API is running on: ${await app.getUrl()}`);
}
bootstrap();
