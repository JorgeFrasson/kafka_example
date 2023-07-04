import { Injectable, Logger } from '@nestjs/common';
import { ICartService, SaveAbandonedCartRequest } from './ICartService';
import { Opportunity } from 'src/models/Opportunity';
import { OpportunityRepository } from 'src/repositories/OpportunityRepository';
import AppError from 'src/shared/errors/AppError';

@Injectable()
export class CartService implements ICartService {
  constructor(private readonly opportunityRepository: OpportunityRepository) {}

  async saveAbandonedCart(
    request: SaveAbandonedCartRequest,
  ): Promise<Opportunity | AppError> {
    try {
      const opportunity = new Opportunity();

      if (!request.customer) {
        return new AppError({
          title: 'Desculpe!',
          message: 'Encontramos um erro ao tentar salvar uma oportunidade',
        });
      }

      opportunity.customer = request.customer;
      opportunity.items = request.items;
      opportunity.customerId = request.customer.id;

      const response = await this.opportunityRepository.saveOpportunity(
        opportunity,
      );

      return response;
    } catch (error) {
      if (error instanceof AppError) {
        Logger.error(error.message, `[Cart Service]`);
        return error;
      }

      Logger.error(error, `[Cart Service]`);
      return new AppError({
        title: 'Desculpe!',
        message: 'Encontramos um erro ao tentar salvar uma oportunidade',
      });
    }
  }
}
