import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('/save')
  saveSomething(@Body() requestBody: XMLHttpRequestBodyInit): string {
    console.log(requestBody);

    return 'Something returned';
  }
}
