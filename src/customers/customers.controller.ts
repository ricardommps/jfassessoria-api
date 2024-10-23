import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  UploadedFile,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { DeleteResult } from 'typeorm';

import { Roles } from '../decorators/roles.decorator';
import { UserId } from '../decorators/user-id.decorator';
import { UpdatePasswordDTO } from '../user/dtos/update-password.dto';
import { UserType } from '../user/enum/user-type.enum';
import { CustomersService } from './customers.service';
import { CreateCustomersDto } from './dtos/createCustomers.dtos';
import { NewPasswordDTO } from './dtos/newPassword.dtos';
import { ReturnCustomerIdDto } from './dtos/returnCustomerId.dtos';
import { ReturnCustomerDto } from './dtos/returnCustomers.dtos';
import { ReturnMyDataDto } from './dtos/returnMyData.dtos';
import { UpdateCustomersDto } from './dtos/updateCustomer.dto';
import { CustomerEntity } from './entities/customer.entity';

export interface CustomerEmail {
  email: string;
}

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

  @Patch('/avatar')
  @UseInterceptors(FileInterceptor('file'))
  uploadImage(
    @UploadedFile() file: Express.Multer.File,
    @UserId() userId: number,
  ) {
    return this.customerService.uploadImageToCloudinary(file, userId);
  }

  @Get('/myData')
  async getMyData(@UserId() userId: number): Promise<ReturnMyDataDto> {
    return new ReturnMyDataDto(
      await this.customerService.findCustomerById(userId),
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
  @Get('/profile/:customerId')
  async profile(
    @Param('customerId') customerId: number,
    @UserId() userId: number,
  ) {
    const profile = await this.customerService.getProfile(customerId, userId);
    return profile;
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

  @Roles(UserType.Admin, UserType.Root, UserType.User)
  @Patch('/resetPassword')
  @UsePipes(ValidationPipe)
  async updatePasswordUser(
    @Body() updatePasswordDTO: UpdatePasswordDTO,
    @UserId() userId: number,
  ): Promise<CustomerEntity> {
    return this.customerService.updatePasswordCustomer(
      updatePasswordDTO,
      userId,
    );
  }

  @Roles(UserType.Admin, UserType.Root, UserType.User)
  @Patch('/newPassword/:customerId')
  @UsePipes(ValidationPipe)
  async newPassword(
    @Body() updatePasswordDTO: NewPasswordDTO,
    @Param('customerId') customerId: number,
  ): Promise<CustomerEntity> {
    return this.customerService.newPasswordCustomer(
      updatePasswordDTO,
      customerId,
    );
  }

  @Post('/checkEmail')
  async checkEmail(@Body() customer: CustomerEmail) {
    return this.customerService.checkEmail(customer);
  }
}
