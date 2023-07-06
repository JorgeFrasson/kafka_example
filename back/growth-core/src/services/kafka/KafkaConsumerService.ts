import { Injectable, OnApplicationShutdown } from '@nestjs/common';
import { ConsumerSubscribeTopics } from '@nestjs/microservices/external/kafka.interface';
import { Consumer, ConsumerRunConfig, Kafka } from 'kafkajs';

@Injectable()
export class KafkaConsumerService implements OnApplicationShutdown {
  private readonly kafka = new Kafka({
    brokers: [process.env.KAFKA_BROKER],
  });
  private readonly consumers: Consumer[] = [];

  async readMessage(topic: ConsumerSubscribeTopics, config: ConsumerRunConfig) {
    const consumer = this.kafka.consumer({ groupId: 'cart-consumer' });
    await consumer.connect();
    await consumer.subscribe(topic);
    await consumer.run(config);
    this.consumers.push(consumer);
  }

  async onApplicationShutdown() {
    for (const consumer of this.consumers) {
      await consumer.disconnect();
    }
  }
}
