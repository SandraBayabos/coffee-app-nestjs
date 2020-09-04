import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { triggerAsyncId } from 'async_hooks';

async function bootstrap() {
  // nest application is created via the NestFactory.create, taking in an AppModule
  // AppModule is the root module for our application, taking in everything that our app needs to run
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({
    // in coffee.controller => transforms createCoffeeDto into an instance of CreateCoffeeDto
    // also helps with primitive transformations e.g. number to string (e.g. for id)
    transform: true,
    whitelist: true,
    forbidNonWhitelisted: true,
  }));
  await app.listen(3000);
}
bootstrap();
