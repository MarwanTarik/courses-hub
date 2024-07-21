import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);
  const port = configService.getOrThrow('PORT');
  const host = configService.getOrThrow('HOST');

  app.setGlobalPrefix('api');

  const config = new DocumentBuilder()
    .setTitle('courses-hub')
    .setDescription('Courses registeration manegment api')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/doc', app, document);

  await app.listen(port);

  console.log(`server is up and running on http://${host}:${port}/api`);
}
bootstrap();
