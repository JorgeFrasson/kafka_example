import { Injectable, Logger } from '@nestjs/common';
import {
  ICustomerService,
  ListCustomersRequest,
  SaveCustomerRequest,
} from './ICustomerService';
import { Customer } from 'src/models/Customer';
import { CustomerRepository } from 'src/repositories/CustomerRepository';

@Injectable()
export class CustomerService implements ICustomerService {
  constructor(private readonly customerRepository: CustomerRepository) {}

  async listCustomers(request: ListCustomersRequest): Promise<Customer[]> {
    console.log(
      '🚀 ~ file: CustomerService.ts:11 ~ MessageService ~ listCustomers ~ request:',
      request,
    );

    console.log(__dirname);

    const response = await this.customerRepository.getCustomers();

    return response;
  }

  async saveCustomer(request: SaveCustomerRequest): Promise<Customer> {
    Logger.log(
      `Cadastrando usuário ${request.firstName} ${request.lastName}`,
      `Customer Service`,
    );

    const customer = new Customer();

    customer.firstName = request.firstName;
    customer.lastName = request.lastName;
    customer.email = request.email;
    customer.phone = request.phone;

    const customerDB = await this.customerRepository.save(customer);

    return customerDB;
  }
}
