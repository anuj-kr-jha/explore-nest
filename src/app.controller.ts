import { Controller, Get, HttpCode, Query, Redirect, UseInterceptors } from '@nestjs/common';
import { AppService } from './app.service.js';
import { CacheInterceptor } from '@nestjs/cache-manager';

@Controller()
// @UseInterceptors(CacheInterceptor)
export class AppController {
  #appService: AppService;
  constructor(appService: AppService) {
    this.#appService = appService;
  }

  @Get()
  getHello(): string {
    return this.#appService.getHello();
  }

  // Redirection
  @Get('doc')
  @Redirect('https://docs.nestjs.com', 301)
  getDoc() {}
  // http://localhost:3000/doc

  // Dynamic redirection
  @Get('docs')
  @Redirect('https://docs.nestjs.com', 302)
  getDocs(@Query('version') version: string) {
    if (version && version === '4') {
      return { url: 'https://docs.nestjs.com/v4/' };
    }
    if (version && version === '5') {
      return { url: 'https://docs.nestjs.com/v5/' };
    }
  }
  // http://localhost:3000/docs/?version=5
}
