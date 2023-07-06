import { Customer } from 'src/models/Customer';

export interface ICustomerService {
  listCustomers(request: ListCustomersRequest): Promise<Customer[]>;
  saveCustomer(request: SaveCustomerRequest): Promise<Customer>;
}

export class ListCustomersRequest {
  page: number;
  limit: number;
  searchQuery: string;
}

export class SaveCustomerRequest {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}
