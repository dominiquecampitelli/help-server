import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
const app = await NestFactory.create(AppModule);
  const port = process.env.PORT || 3000;
  const date = new Date;
  const currentTime = date.toLocaleTimeString('pt-BR', { hour12: false });

  const config = new DocumentBuilder()
    .setTitle('Help Server API')
    .setDescription('API documentation for Help Server')
    .setVersion('1.0')
    .build();
  
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  app.enableCors();
  app.useGlobalPipes(new ValidationPipe());

  await app.listen(port);
  console.log('port: ' + port)
  console.log('connected ' + currentTime)
}
bootstrap();
