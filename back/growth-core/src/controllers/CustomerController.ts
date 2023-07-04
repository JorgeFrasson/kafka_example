import { Controller, Get, Query, Req } from '@nestjs/common';
import { CustomerService } from 'src/services/customer/CustomerService';
import { ListCustomersRequest } from 'src/services/customer/ICustomerService';

@Controller('customer')
export class CustomerController {
  constructor(private readonly customersService: CustomerService) {}

  @Get()
  async getCustomers(@Query() request: ListCustomersRequest) {
    const response = await this.customersService.listCustomers(request);

    return response;
  }
}
