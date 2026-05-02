import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule);
  const ALLOWED_ORIGIN: string[] = ['http://localhost:5173'];
  app.enableCors({ origin: ALLOWED_ORIGIN });

  app.setGlobalPrefix('api');
  await app.listen(process.env.PORT ?? 8080);
}
void bootstrap();
