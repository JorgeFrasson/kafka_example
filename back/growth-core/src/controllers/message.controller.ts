import { Body, Controller, Post } from '@nestjs/common';
import { MessageService } from 'src/services/message.service';

@Controller('message')
export class MessageController {
  constructor(private readonly messageService: MessageService) {}

  @Post('/save')
  async saveSomething(@Body() requestBody: any) {
    const response = await this.messageService.readMessage(requestBody);

    console.log('Mesagem enviada: ', response);
    return response;
  }
}
