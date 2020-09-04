import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

// AppController is also just a class with a different decorator
// controllers are where specific requests are handled by the application
// in this controller, it's utilising the appService provider 
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  // in this controller, it's using a Get request
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
