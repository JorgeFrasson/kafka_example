import { Customer } from 'src/models/Customer';
import { Opportunity } from 'src/models/Opportunity';
import AppError from 'src/shared/errors/AppError';
import { CartItem } from '../cart/ICartService';

export interface IOpportunityService {
  saveOpportunity(
    request: SaveOpportunityRequest,
  ): Promise<Opportunity | AppError>;

  findByOrganization(organizationId: number): Promise<Opportunity[] | AppError>;
}

export class SaveOpportunityRequest {
  customer: Customer;
  items: CartItem[];
  organizationId: number;
}
