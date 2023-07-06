import { Inject, Injectable, Logger } from '@nestjs/common';
import { ICartService, SaveAbandonedCartRequest } from './ICartService';
import { OpportunityRepository } from 'src/repositories/OpportunityRepository';
import AppError from 'src/shared/errors/AppError';
import { ClientKafka } from '@nestjs/microservices';
import { KafkaProducerService } from '../kafka/KafkaProducerService';
import { CartAbandonedMessageTransport } from '../kafka/cart/CartAbandonedMessageTransport';

@Injectable()
export class CartService implements ICartService {
  constructor(
    private readonly opportunityRepository: OpportunityRepository,
    @Inject('CART_SERVICE')
    private readonly kafkaClient: ClientKafka,
    private readonly cartAbandonedMesageTransport: CartAbandonedMessageTransport,
  ) {}

  async saveAbandonedCart(request: SaveAbandonedCartRequest): Promise<any> {
    try {
      Logger.log(`Carrinho abandonado recebido`, `Cart Service`);
      if (!request.customer) {
        return new AppError({
          title: 'Desculpe!',
          message: 'Encontramos um erro ao tentar salvar uma oportunidade',
        });
      }

      Logger.log(`Enviando mesagem de carrinho abandonado`, `Cart Service`);

      const cart = {
        id: request.id,
        customer: request.customer,
        items: request.items,
        organizationId: 1,
      }; // Deveria ser buscado no banco de dados.

      await this.cartAbandonedMesageTransport.sendCartAbandonedMessage(cart);

      return true;
    } catch (error) {
      if (error instanceof AppError) {
        Logger.error(error.message, `Cart Service`);
        return error;
      }

      Logger.error(error, `Cart Service`);
      return new AppError({
        title: 'Desculpe!',
        message: 'Encontramos um erro ao tentar salvar uma oportunidade',
      });
    }
  }
}
