import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { LoggingInterceptor } from './common/interceptors/logging.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: false,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );
  app.enableCors();
  app.use(require('express').json({ limit: '1mb' }));
  await app.listen(process.env.ORDER_PORT ?? 3000);

  // await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
