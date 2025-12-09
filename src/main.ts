import { NestFactory } from '@nestjs/core';
import path from 'path';

import { AppModule } from './app.module';

async function bootstrap() {
  // Google Cloud Config
  const keyPath: string = path.join(__dirname, '../keys/mica-ai.json');
  process.env.GOOGLE_APPLICATION_CREDENTIALS = keyPath;

  const app = await NestFactory.create(AppModule);
  const ALLOWED_ORIGIN: string[] = ['http://localhost:5173'];
  app.enableCors({ origin: ALLOWED_ORIGIN });

  app.setGlobalPrefix('api');
  await app.listen(process.env.PORT ?? 3000);
}
void bootstrap();
