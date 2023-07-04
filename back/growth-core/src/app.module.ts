import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MessageController } from './controllers/message.controller';
import { MessageService } from './services/message.service';

@Module({
  imports: [],
  controllers: [AppController, MessageController],
  providers: [AppService, MessageService],
})
export class AppModule {}
