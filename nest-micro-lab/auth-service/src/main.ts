import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.use(require('express').json({ limit: '1mb' }));

  const port = process.env.AUTH_PORT ? Number(process.env.AUTH_PORT) : 3000;

  // Listen on all interfaces
  await app.listen(port, '0.0.0.0');
}
bootstrap();
