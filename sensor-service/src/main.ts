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
    origin: '*',
    credentials: true
  });
  await app.listen(process.env.PORT || 80, '0.0.0.0');
  console.log(`🚀 Server running on http://localhost:${process.env.PORT || 80}`);
  await connectProducer();

}

bootstrap();
