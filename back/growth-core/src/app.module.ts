import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomerRepository } from './repositories/CustomerRepository';
import { CustomerController } from './controllers/CustomerController';
import { CustomerService } from './services/customer/CustomerService';
import { CartController } from './controllers/CartController';
import { CartService } from './services/cart/CartService';
import { OpportunityRepository } from './repositories/OpportunityRepository';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { OpportunityService } from './services/opportunity/OpportunityService';
import { OpportunityController } from './controllers/OpportunityController';
import { KafkaProducerService } from './services/kafka/KafkaProducerService';
import { KafkaConsumerService } from './services/kafka/KafkaConsumerService';
import { CartAbandonedMessageConsumer } from './services/kafka/cart/CartAbandonedMessageConsumer';
import { CartAbandonedMessageTransport } from './services/kafka/cart/CartAbandonedMessageTransport';
// import { KafkaProducerService } from './services/kafka/KafkaProducerService';
@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: `.env/${process.env.NODE_ENV}.env` }),
    ClientsModule.register([
      {
        name: 'CART_SERVICE',
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: 'cart-consumer',
            brokers: [process.env.KAFKA_BROKER],
          },
        },
      },
    ]),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DATABASE_HOST,
      port: Number(process.env.DATABASE_PORT),
      username: `${process.env.DATABASE_USER}`,
      password: `${process.env.DATABASE_PASSWORD}`,
      database: `${process.env.DATABASE_NAME}`,
      entities: [__dirname + '/models/*{.ts,.js}'],
      synchronize: true,
    }),
  ],
  controllers: [
    AppController,
    CustomerController,
    CartController,
    OpportunityController,
  ],
  providers: [
    AppService,
    CustomerRepository,
    CustomerService,
    CartService,
    OpportunityRepository,
    OpportunityService,
    KafkaProducerService,
    KafkaConsumerService,
    CartAbandonedMessageConsumer,
    CartAbandonedMessageTransport,
  ],
})
export class AppModule {}
