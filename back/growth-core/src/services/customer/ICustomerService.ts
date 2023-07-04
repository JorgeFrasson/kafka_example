import { Customer } from 'src/models/customer.entity';

export interface ICustomerService {
  listCustomers(request: ListCustomersRequest): Promise<Customer[]>;
}

export class ListCustomersRequest {
  page: number;
  limit: number;
  searchQuery: string;
}
