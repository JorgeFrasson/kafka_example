import { Injectable } from '@nestjs/common';
import { ICustomerService, ListCustomersRequest } from './ICustomerService';
import { Customer } from 'src/models/customer.entity';
import { CustomerRepository } from 'src/repositories/CustomerRepository';

@Injectable()
export class CustomerService implements ICustomerService {
  constructor(private readonly customerRepository: CustomerRepository) {}

  async listCustomers(request: ListCustomersRequest): Promise<Customer[]> {
    console.log(
      '🚀 ~ file: CustomerService.ts:11 ~ MessageService ~ listCustomers ~ request:',
      request,
    );

    const response = await this.customerRepository.getCustomers();

    return response;
  }
}
