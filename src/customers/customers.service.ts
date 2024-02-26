import {
  BadGatewayException,
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
  UnauthorizedException,
  forwardRef,
} from '@nestjs/common';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { DataSource, DeleteResult, Repository } from 'typeorm';
import { FinishedTrainingEntity } from '../finished-training/entities/finished-training.entity';
import { ProgramEntity } from '../program/entities/program.entity';
import { TrainingEntity } from '../training/entities/training.entity';
import { UpdatePasswordDTO } from '../user/dtos/update-password.dto';
import { UserType } from '../user/enum/user-type.enum';
import { UserService } from '../user/user.service';
import { createPasswordHashed, validatePassword } from '../utils/password';
import { CreateCustomersDto } from './dtos/createCustomers.dtos';
import { NewPasswordDTO } from './dtos/newPassword.dtos';
import { UpdateCustomersDto } from './dtos/updateCustomer.dto';
import { CustomerEntity } from './entities/customer.entity';

@Injectable()
export class CustomersService {
  constructor(
    @InjectRepository(CustomerEntity)
    private readonly customerRepository: Repository<CustomerEntity>,

    @Inject(forwardRef(() => UserService))
    private readonly userService: UserService,

    @InjectDataSource() private dataSource: DataSource,
  ) {}

  async getAllCustomer(userId): Promise<CustomerEntity[]> {
    return this.customerRepository.find({
      where: {
        userId,
      },
      relations: {
        programs: true,
        payments: true,
      },
      order: {
        name: 'ASC',
        payments: {
          startDate: 'DESC',
        },
      },
    });
  }

  async getAllCustomerQuery(userId) {
    const qb = await this.dataSource
      .createQueryBuilder()
      .select(['c.id AS id', 'c.name AS name', 'c.active AS active'])
      .addSelect('COUNT(DISTINCT pro.id)', 'programs')
      .addSelect(
        'COUNT(DISTINCT ft.id) filter (where ft.review IS NOT TRUE)',
        'reviews',
      )
      .addSelect(
        "COALESCE((select json_agg(payment.*) from payment where payment.customer_id = c.id), 'null'::json) AS payments",
      )
      .from(CustomerEntity, 'c')
      .leftJoin(ProgramEntity, 'pro', 'pro.customer_id = c.id')
      .leftJoin(TrainingEntity, 'tra', 'tra.program_id = pro.id')
      .leftJoin(FinishedTrainingEntity, 'ft', 'ft.training_id = tra.id')
      .where('c.user_id= :userId', { userId: userId })
      .orderBy('c.name', 'ASC')
      .groupBy('c.id');
    const customers = await qb.getRawMany();
    return customers;
  }

  async createCustomer(
    createCustomersDto: CreateCustomersDto,
    userId: number,
  ): Promise<CustomerEntity> {
    await this.userService.findUserById(userId);
    const customer = await this.findCustomerByEmail(
      createCustomersDto.email,
    ).catch(() => undefined);

    if (customer) {
      throw new BadRequestException('email registred in system');
    }
    //  const emailPrefix = createCustomersDto.email.split('@');
    // const passwordHashed = await createPasswordHashed(`${emailPrefix[0]}123`);
    return this.customerRepository.save({
      ...createCustomersDto,
      userId,
      typeUser: UserType.User,
      password: null,
      temporaryPassword: false,
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

  async customerMe(userId: number, password: string): Promise<CustomerEntity> {
    const customer = await this.customerRepository.findOne({
      where: {
        id: userId,
      },
    });
    if (customer.password !== password) {
      throw new UnauthorizedException();
    }
    if (!customer) {
      throw new NotFoundException(`CustomerId: ${userId} Not Found`);
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
    userId: number,
  ): Promise<CustomerEntity> {
    const customer = await this.customerRepository.findOne({
      where: {
        userId,
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
    const customerByEmail = await this.findUserByEmail(
      updateCustomerDTO.email,
    ).catch(() => undefined);
    if (customerByEmail && updateCustomerDTO.email !== customerByEmail.email) {
      throw new BadGatewayException('email registered in system');
    }
    return this.customerRepository.save({
      ...customer,
      ...updateCustomerDTO,
      temporaryPassword: false,
    });
  }

  async deleteCustomer(customerId: number): Promise<DeleteResult> {
    await this.findCustomerById(customerId);

    return this.customerRepository.delete({ id: customerId });
  }

  async updatePasswordCustomer(
    updatePasswordDTO: UpdatePasswordDTO,
    userId: number,
  ): Promise<CustomerEntity> {
    const customer = await this.findCustomerById(userId);

    const passwordHashed = await createPasswordHashed(
      updatePasswordDTO.newPassword,
    );

    const isMatch = await validatePassword(
      updatePasswordDTO.lastPassword,
      customer.password || '',
    );

    if (!isMatch) {
      throw new BadRequestException('Last password invalid');
    }

    return this.customerRepository.save({
      ...customer,
      password: passwordHashed,
      temporaryPassword: false,
    });
  }

  async newPasswordCustomer(
    updatePasswordDTO: NewPasswordDTO,
    customerId: number,
  ): Promise<CustomerEntity> {
    const customer = await this.findCustomerById(customerId);
    const passwordHashed = await createPasswordHashed(
      updatePasswordDTO.newPassword,
    );
    return this.customerRepository.save({
      ...customer,
      password: passwordHashed,
      temporaryPassword: true,
    });
  }
}
