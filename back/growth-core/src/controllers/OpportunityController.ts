import { Controller, Get, Query } from '@nestjs/common';
import { OpportunityService } from 'src/services/opportunity/OpportunityService';

@Controller('opportunity')
export class OpportunityController {
  constructor(private readonly opportunityService: OpportunityService) {}

  @Get()
  async getAll(@Query() query: any) {
    const response = await this.opportunityService.findByOrganization(
      query.organizationId,
    );

    return response;
  }
}
