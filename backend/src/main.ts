import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ExceptionFilterImpl } from './config/filters/exception.filter';

async function bootstrap() {
  const frontedURL = process.env.FRONTEND_URL;
  const port = process.env.PORT;

  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: [frontedURL],
    credentials: true,
  });
  app.useGlobalFilters(new ExceptionFilterImpl());
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(Number(port ?? 3000));
}
void bootstrap();
