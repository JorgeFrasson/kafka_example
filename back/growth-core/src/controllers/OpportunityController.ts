import { Controller, Logger } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { SaveOpportunityRequest } from 'src/services/opportunity/IOpportunityService';
import { OpportunityService } from 'src/services/opportunity/OpportunityService';

@Controller()
export class OpportunityController {
  constructor(private readonly opportunityService: OpportunityService) {}

  @MessagePattern('cart-abandoned')
  async saveOpportunity(@Payload() request: SaveOpportunityRequest) {
    Logger.log(
      'Mensagem de carrinho abandonado recebida!',
      'Opportunity Controller',
    );

    const response = await this.opportunityService.saveOpportunity(request);

    return response;
  }
}
