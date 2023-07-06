import { Body, Controller, Get, Post, Query, Req } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CustomerService } from 'src/services/customer/CustomerService';
import {
  ListCustomersRequest,
  SaveCustomerRequest,
} from 'src/services/customer/ICustomerService';

@Controller('customer')
export class CustomerController {
  constructor(private readonly customersService: CustomerService) {}

  @Get()
  async getCustomers(@Query() request: ListCustomersRequest) {
    const response = await this.customersService.listCustomers(request);

    return response;
  }

  @Post('save')
  async saveCustomer(@Body() request: SaveCustomerRequest) {
    const response = await this.customersService.saveCustomer(request);

    return response;
  }
}
