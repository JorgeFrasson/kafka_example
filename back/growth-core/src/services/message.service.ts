import { Injectable } from '@nestjs/common';
import {
  MessageServiceInterface,
  ReadMessageRequest,
  ReadMessageResponse,
} from './message.interface';

@Injectable()
export class MessageService implements MessageServiceInterface {
  async readMessage(request: ReadMessageRequest): Promise<ReadMessageResponse> {
    try {
      console.log(request);

      return request;
    } catch (error) {
      return error;
    }
  }
}
