import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ExceptionFilterImpl } from './config/filters/exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new ExceptionFilterImpl());
  app.useGlobalPipes(new ValidationPipe());
  const port = process.env.PORT;
  await app.listen(Number(port ?? 3000));
}
void bootstrap();
