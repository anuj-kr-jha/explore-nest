import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service.js';

@Controller()
export class AppController {
  #appService: AppService;
  constructor(appService: AppService) {
    this.#appService = appService;
  }

  @Get()
  getHello(): string {
    return this.#appService.getHello();
  }
}
