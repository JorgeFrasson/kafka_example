import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  Logger.log(`Conectando ao Kafka pelo broker ${process.env.KAFKA_BROKER}`);

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.KAFKA,
    options: {
      client: {
        brokers: [process.env.KAFKA_BROKER],
      },
      consumer: {
        groupId: 'cart-consumer',
      },
    },
  });

  app.startAllMicroservices();
  await app.listen(3000);
}
bootstrap();
