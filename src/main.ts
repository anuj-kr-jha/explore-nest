import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module.js';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    // logger: ['error', 'warn', 'debug', 'log', 'verbose'],
    cors: true,
  });
  await app.listen(3000);
}
bootstrap();
