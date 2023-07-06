import { Injectable, OnModuleInit } from '@nestjs/common';
import { OpportunityService } from 'src/services/opportunity/OpportunityService';
import { KafkaConsumerService } from '../KafkaConsumerService';

@Injectable()
export class CartAbandonedMessageConsumer implements OnModuleInit {
  constructor(
    private readonly opportunityService: OpportunityService,
    private readonly kafkaConsumer: KafkaConsumerService,
  ) {}

  async onModuleInit() {
    await this.kafkaConsumer.readMessage(
      { topics: ['cart-abandoned'] },
      {
        eachMessage: async ({ topic, partition, message }) => {
          const cart = JSON.parse(message.value.toString());
          const organizationId = parseInt(
            message.headers.organizationId.toString(),
          );

          await this.opportunityService.saveOpportunity({
            customer: cart.customer,
            items: cart.items,
            organizationId,
          });
        },
      },
    );
  }
}
