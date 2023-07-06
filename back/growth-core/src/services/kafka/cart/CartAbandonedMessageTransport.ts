import { Injectable } from '@nestjs/common';
import { KafkaProducerService } from '../KafkaProducerService';
import { Customer } from 'src/models/Customer';
import { CartItem } from 'src/services/cart/ICartService';

@Injectable()
export class CartAbandonedMessageTransport {
  constructor(private readonly kafkaProducer: KafkaProducerService) {}

  async sendCartAbandonedMessage(message: CartAbandonedMessage) {
    await this.kafkaProducer.sendMessage({
      topic: 'cart-abandoned',
      messages: [
        {
          key: 'cart',
          value: JSON.stringify({
            id: message.id,
            customer: message.customer,
            items: message.items,
          }),
          headers: {
            organizationId: message.organizationId.toString(),
          },
        },
      ],
    });
  }
}

export class CartAbandonedMessage {
  id: number;
  customer: Customer;
  items: CartItem[];
  organizationId: number;
}
