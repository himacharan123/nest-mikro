import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions:{
        enableImplicitConversion:true
      }
    }),
  );

  const config = new DocumentBuilder()
    .setTitle('NestJS Tutorial - BLOG API')
    .setDescription('Use the Base API URL as http://localhost:3000')
    .setTermsOfService('http://localhost:3000/terms-of-service')
    .setLicense('MIT', 'https://github.com/git/git-scm.com/blob/main/MIT-LICENSE.txt')
    .addServer('http://localhost:3000/')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  // MikroORM is initialized automatically by NestJS via MikroOrmModule in AppModule.
  
  await app.listen(3000);
}

bootstrap();
