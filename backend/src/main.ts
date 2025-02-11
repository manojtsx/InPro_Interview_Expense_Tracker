import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
const PORT = process.env.PORT; 

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin : 'http://localhost:3000',
    methods : "GET,POST,PUT,DELETE",
    allowedHeaders : 'Content-Type,Authorization'
  })
   // Global Exception Filters
   app.useGlobalPipes(new ValidationPipe());
  app.setGlobalPrefix('api')
  await app.listen(PORT || 3000);
  console.log(`Application is running on http://localhost:${PORT}`);
}
bootstrap(); 
