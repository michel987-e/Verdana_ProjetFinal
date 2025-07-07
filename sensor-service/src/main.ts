import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import * as cookieParser from 'cookie-parser';
import { connectProducer } from '../kafka/producer';

dotenv.config();

async function bootstrap() {
  const app =await NestFactory.create(AppModule);
  app.use(cookieParser());
  app.enableCors({
    origin: 'http://localhost',
    credentials: true
  });
  await connectProducer();
  await app.listen(process.env.PORT || 80);
  console.log(`🚀 Server running on http://localhost:${process.env.PORT || 80}`);
}

bootstrap();
