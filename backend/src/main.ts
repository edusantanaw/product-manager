import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ExceptionFilterImpl } from './config/filters/exception.filter';
import { EnvVariables } from './config/constants/env-variables';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new ExceptionFilterImpl());
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(EnvVariables.PORT);
}
void bootstrap();
