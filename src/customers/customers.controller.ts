import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { Roles } from 'src/decorators/roles.decorator';
import { UserType } from 'src/user/enum/user-type.enum';
import { ReturnCustomerDto } from './dtos/returnCustomers.dtos';
import { ReturnCustomerIdDto } from './dtos/returnCustomerId.dtos';
import { CustomersService } from './customers.service';
import { CreateCustomersDto } from './dtos/createCustomers.dtos';
import { CustomerEntity } from './entities/customer.entity';
import { UpdateCustomersDto } from './dtos/updateCustomer.dto';

@Controller('api/v2/customer')
export class CustomersController {
  constructor(private readonly customerService: CustomersService) {}

  @Roles(UserType.Admin, UserType.Root)
  @Get()
  async getAllCustomer(): Promise<ReturnCustomerDto[]> {
    return (await this.customerService.getAllCustomer()).map(
      (customerEntity) => new ReturnCustomerDto(customerEntity),
    );
  }

  @Roles(UserType.Admin, UserType.Root)
  @UsePipes(ValidationPipe)
  @Post()
  async createCustomer(
    @Body() createCustomer: CreateCustomersDto,
  ): Promise<CustomerEntity> {
    return this.customerService.createCustomer(createCustomer);
  }

  @Roles(UserType.Admin, UserType.Root)
  @Get('/:customerId')
  async getUserById(
    @Param('customerId') customerId: number,
  ): Promise<ReturnCustomerIdDto> {
    return new ReturnCustomerIdDto(
      await this.customerService.getCustomerByIdUsingRelations(customerId),
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
}
