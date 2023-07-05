import { Injectable, Logger } from '@nestjs/common';
import {
  IOpportunityService,
  SaveOpportunityRequest,
} from './IOpportunityService';
import { Opportunity } from 'src/models/Opportunity';
import AppError from 'src/shared/errors/AppError';
import { OpportunityRepository } from 'src/repositories/OpportunityRepository';

@Injectable()
export class OpportunityService implements IOpportunityService {
  constructor(private readonly opportunityRepository: OpportunityRepository) {}

  async saveOpportunity(
    request: SaveOpportunityRequest,
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

      Logger.log(
        `Salvando oportunidade ${JSON.stringify(opportunity)}`,
        `Opportunity Service`,
      );

      const response = await this.opportunityRepository.saveOpportunity(
        opportunity,
      );

      return response;
    } catch (error) {
      if (error instanceof AppError) {
        Logger.error(error.message, `Opportunity Service`);
        return error;
      }

      Logger.error(error, `Opportunity Service`);
      return new AppError({
        title: 'Desculpe!',
        message: 'Encontramos um erro ao tentar salvar uma oportunidade',
      });
    }
  }
}
