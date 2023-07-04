import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Customer } from '../models/customer.entity';

@Injectable()
export class CustomerRepository extends Repository<Customer> {
  constructor(private readonly dataSource: DataSource) {
    super(Customer, dataSource.createEntityManager());
  }

  public async getCustomers(): Promise<Customer[]> {
    const result = await this.createQueryBuilder('Customer').getManyAndCount();

    return result[0];
  }
}
