import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import * as express from 'express';

import { AppModule } from './app.module';
import { UPLOADS_FOLDER } from './configs/upload';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  app.setGlobalPrefix('api/v2');
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );
  // Add the following code
  app.use('/avatar', express.static(UPLOADS_FOLDER));
  await app.listen(8080);
}
bootstrap();
