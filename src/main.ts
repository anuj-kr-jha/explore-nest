import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module.js';
import { ValidationPipe } from '@nestjs/common';
async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    // logger: ['error', 'warn', 'debug', 'log', 'verbose'],
    cors: true,
  });

  // app.setGlobalPrefix('api'); // http://localhost:3000/api
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // remove all non-whitelisted properties
      forbidNonWhitelisted: false, // true: throw an error when non-whitelisted properties are present
      forbidUnknownValues: false, // true: throw an error when unknown values are present
      transform: true, // true: transform payload to DTO instance, also perform casting for primitive types automatically
    }),
    // NOTE: transform: set to true will have performance impact
  );
  app.use;
  await app.listen(process.env.PORT!);
}
bootstrap();
