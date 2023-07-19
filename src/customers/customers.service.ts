import {
  BadGatewayException,
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CustomerEntity } from './entities/customer.entity';
import { Repository } from 'typeorm';
import { CreateCustomersDto } from './dtos/createCustomers.dtos';
import { createPasswordHashed } from '../utils/password';
import { UserType } from '../user/enum/user-type.enum';
import { UpdateCustomersDto } from './dtos/updateCustomer.dto';

@Injectable()
export class CustomersService {
  constructor(
    @InjectRepository(CustomerEntity)
    private readonly customerRepository: Repository<CustomerEntity>,
  ) {}

  async getAllCustomer(): Promise<CustomerEntity[]> {
    return this.customerRepository.find({
      relations: {
        programs: true,
      },
    });
  }

  async createCustomer(
    createCustomersDto: CreateCustomersDto,
  ): Promise<CustomerEntity> {
    const customer = await this.findCustomerByEmail(
      createCustomersDto.email,
    ).catch(() => undefined);

    if (customer) {
      throw new BadRequestException('email registred in system');
    }
    const emailPrefix = createCustomersDto.email.split('@');
    const passwordHashed = await createPasswordHashed(`${emailPrefix[0]}123`);
    return this.customerRepository.save({
      ...createCustomersDto,
      typeUser: UserType.User,
      active: false,
      password: passwordHashed,
    });
  }

  async findCustomerByEmail(email: string): Promise<CustomerEntity> {
    const customer = await this.customerRepository.findOne({
      where: {
        email,
      },
    });
    if (!customer) {
      throw new NotFoundException(`Email: ${email} Not Found`);
    }
    return customer;
  }

  async findCustomerById(userId: number): Promise<CustomerEntity> {
    const customer = await this.customerRepository.findOne({
      where: {
        id: userId,
      },
    });
    if (!customer) {
      throw new NotFoundException(`CustomerId: ${userId} Not Found`);
    }
    return customer;
  }

  async findUserByEmail(email: string): Promise<CustomerEntity> {
    const user = await this.customerRepository.findOne({
      where: {
        email,
      },
    });

    if (!user) {
      throw new NotFoundException(`Email: ${email} Not Found`);
    }

    return user;
  }

  async getCustomerByIdUsingRelations(
    customerId: number,
  ): Promise<CustomerEntity> {
    const customer = await this.customerRepository.findOne({
      where: {
        id: customerId,
      },
      relations: {
        programs: true,
      },
    });
    if (!customer) {
      throw new NotFoundException(`CustomerId: ${customerId} Not Found`);
    }
    return customer;
  }

  async updateCustomer(
    updateCustomerDTO: UpdateCustomersDto,
    customerId: number,
  ): Promise<CustomerEntity> {
    const customer = await this.findCustomerById(customerId);
    const customerByEmail = await this.findUserByEmail(customer.email).catch(
      () => undefined,
    );
    if (customerByEmail && updateCustomerDTO.email !== customerByEmail.email) {
      throw new BadGatewayException('email registered in system');
    }
    return this.customerRepository.save({
      ...customer,
      ...updateCustomerDTO,
    });
  }
}
