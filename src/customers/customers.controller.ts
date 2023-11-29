import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { DeleteResult } from 'typeorm';
import { Roles } from '../decorators/roles.decorator';
import { UserId } from '../decorators/user-id.decorator';
import { UserType } from '../user/enum/user-type.enum';
import { CustomersService } from './customers.service';
import { CreateCustomersDto } from './dtos/createCustomers.dtos';
import { ReturnCustomerIdDto } from './dtos/returnCustomerId.dtos';
import { ReturnCustomerDto } from './dtos/returnCustomers.dtos';
import { UpdateCustomersDto } from './dtos/updateCustomer.dto';
import { CustomerEntity } from './entities/customer.entity';

@Controller('customer')
export class CustomersController {
  constructor(private readonly customerService: CustomersService) {}

  @Roles(UserType.Admin, UserType.Root)
  @Get()
  async getAllCustomer(@UserId() userId: number): Promise<ReturnCustomerDto[]> {
    return (await this.customerService.getAllCustomer(userId)).map(
      (customerEntity) => new ReturnCustomerDto(customerEntity),
    );
  }

  @Roles(UserType.Admin, UserType.Root)
  @Get('/all')
  async getAllCustomerQuery(@UserId() userId: number) {
    return await this.customerService.getAllCustomerQuery(userId);
  }

  @Roles(UserType.Admin, UserType.Root)
  @UsePipes(ValidationPipe)
  @Post()
  async createCustomer(
    @Body() createCustomer: CreateCustomersDto,
    @UserId() userId: number,
  ): Promise<CustomerEntity> {
    return this.customerService.createCustomer(createCustomer, userId);
  }

  @Roles(UserType.Admin, UserType.Root)
  @Get('/:customerId')
  async getUserById(
    @Param('customerId') customerId: number,
    @UserId() userId: number,
  ): Promise<ReturnCustomerIdDto> {
    return new ReturnCustomerIdDto(
      await this.customerService.getCustomerByIdUsingRelations(
        customerId,
        userId,
      ),
    );
  }

  @Roles(UserType.Admin, UserType.Root)
  @UsePipes(ValidationPipe)
  @Put('/:customerId')
  async updateProduct(
    @Body() updateCustomerDTO: UpdateCustomersDto,
    @Param('customerId') customerId: number,
  ): Promise<CustomerEntity> {
    return this.customerService.updateCustomer(updateCustomerDTO, customerId);
  }

  @Delete('/:customerId')
  async deleteCustomer(
    @Param('customerId') customerId: number,
  ): Promise<DeleteResult> {
    return this.customerService.deleteCustomer(customerId);
  }
}
