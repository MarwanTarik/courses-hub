import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);
  const port = configService.getOrThrow('PORT');
  const host = configService.getOrThrow('HOST');

  await app.listen(port);

  console.log(`server is up and running on http://${host}:${port}`);
}
bootstrap();
