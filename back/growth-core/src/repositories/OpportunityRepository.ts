import { Injectable } from '@nestjs/common';
import { Opportunity } from 'src/models/Opportunity';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class OpportunityRepository extends Repository<Opportunity> {
  constructor(private dataSource: DataSource) {
    super(Opportunity, dataSource.createEntityManager());
  }
  async saveOpportunity(opportunity: Opportunity) {
    const opportunityDB = this.save(opportunity);

    return opportunityDB;
  }
}
