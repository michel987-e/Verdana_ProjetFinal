import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { runConsumer } from 'kafka/consumer';

async function bootstrap() {
  await NestFactory.createApplicationContext(AppModule);
  await runConsumer();
}

bootstrap();
