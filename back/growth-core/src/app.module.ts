import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MessageController } from './controllers/MessageController';
import { MessageService } from './services/message/MessageService';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomerRepository } from './repositories/CustomerRepository';
import { CustomerController } from './controllers/CustomerController';
import { CustomerService } from './services/customer/CustomerService';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: `.env/${process.env.NODE_ENV}.env` }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DATABASE_HOST,
      port: Number(process.env.DATABASE_PORT),
      username: `${process.env.DATABASE_USER}`,
      password: `${process.env.DATABASE_PASSWORD}`,
      database: `${process.env.DATABASE_NAME}`,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
  ],
  controllers: [AppController, MessageController, CustomerController],
  providers: [AppService, MessageService, CustomerRepository, CustomerService],
})
export class AppModule {}
