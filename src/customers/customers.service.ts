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
import { AnamnesisEntity } from 'src/anamnese/entities/anamnese.entity';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { DataSource, DeleteResult, Repository } from 'typeorm';
import { FinishedTrainingEntity } from '../finished-training/entities/finished-training.entity';
import { ProgramEntity } from '../program/entities/program.entity';
import { TrainingEntity } from '../training/entities/training.entity';
import { UpdatePasswordDTO } from '../user/dtos/update-password.dto';
import { UserType } from '../user/enum/user-type.enum';
import { UserService } from '../user/user.service';
import { createPasswordHashed, validatePassword } from '../utils/password';
import { CustomerEmail } from './customers.controller';
import { CreateCustomersDto } from './dtos/createCustomers.dtos';
import { NewPasswordDTO } from './dtos/newPassword.dtos';
import { CustomerEntity } from './entities/customer.entity';

@Injectable()
export class CustomersService {
  constructor(
    @InjectRepository(CustomerEntity)
    private readonly customerRepository: Repository<CustomerEntity>,

    @Inject(forwardRef(() => UserService))
    private readonly userService: UserService,

    @InjectDataSource() private dataSource: DataSource,

    private cloudinary: CloudinaryService,
  ) {}

  async uploadImageToCloudinary(file: Express.Multer.File, userId: number) {
    const customer = await this.findCustomerById(userId);
    if (!customer) {
      throw new NotFoundException(
        'Somente usuários autenticados podem mudar o avatar',
      );
    }
    if (customer.cloudinaryId && customer.avatar) {
      await this.cloudinary.deleteImage(String(customer.cloudinaryId));
    }
    const result = await this.cloudinary.uploadImage(file);
    customer.avatar = result?.secure_url || customer.avatar;
    customer.cloudinaryId = result?.public_id || customer.cloudinaryId;
    return this.customerRepository.save({
      ...customer,
    });
  }

  async getAllCustomer(userId): Promise<CustomerEntity[]> {
    return this.customerRepository.find({
      where: {
        userId,
      },
      relations: {
        programs: true,
        payments: true,
        anamneses: true,
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
      .select([
        'c.id AS id',
        'c.name AS name',
        'c.active AS active',
        'c.avatar as avatar',
      ])
      .addSelect('COUNT(DISTINCT pro.id)', 'programs')
      .addSelect(
        'COUNT(DISTINCT ft.id) filter (where ft.review IS NOT TRUE)',
        'reviews',
      )
      .addSelect(
        "COALESCE((select json_agg(payment.*) from payment where payment.customer_id = c.id), 'null'::json) AS payments",
      )
      // Adicionar verificação de anamnese existente e se read é true
      .addSelect(
        `CASE 
          WHEN COUNT(anam.id) > 0 THEN true 
          ELSE false 
        END AS hasAnamneses`,
      )
      .addSelect(
        `CASE 
          WHEN COUNT(anam.id) > 0 AND BOOL_OR(anam.read = true) THEN true 
          ELSE false 
        END AS anamnesisRead`,
      )
      .from(CustomerEntity, 'c')
      .leftJoin(ProgramEntity, 'pro', 'pro.customer_id = c.id')
      .leftJoin(TrainingEntity, 'tra', 'tra.program_id = pro.id')
      .leftJoin(FinishedTrainingEntity, 'ft', 'ft.training_id = tra.id')
      .leftJoin(AnamnesisEntity, 'anam', 'anam.customer_id = c.id') // Join com a tabela de anamneses
      .where('c.user_id = :userId', { userId: userId })
      .orderBy('c.name', 'ASC')
      .groupBy('c.id');

    const customers = await qb.getRawMany();
    return customers;
  }

  async createCustomerAnamnese(customerData) {
    const userId = 1;
    await this.userService.findUserById(userId);
    const customer = await this.findCustomerByEmail(customerData.email).catch(
      () => undefined,
    );
    if (customer) {
      throw new BadRequestException('email registred in system');
    }
    return this.customerRepository.save({
      ...customerData,
      userId,
      typeUser: UserType.User,
      password: null,
      temporaryPassword: false,
      active: false,
    });
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

  async findCustomerByEmailAnamnese(email: string): Promise<CustomerEntity> {
    const customer = await this.customerRepository.findOne({
      where: {
        email,
      },
      relations: {
        anamneses: true,
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
      relations: ['rating'],
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

  async getProfile(
    customerId: number,
    userId: number,
  ): Promise<CustomerEntity> {
    const customer = await this.customerRepository.findOne({
      where: {
        userId,
        id: customerId,
      },
    });
    if (!customer) {
      throw new NotFoundException(`CustomerId: ${customerId} Not Found`);
    }
    return customer;
  }

  async updateCustomer(
    updateCustomerDTO,
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

  async updateCustomerAnamnese(customerUpdate, userId: number) {
    // Busca o cliente pelo ID (userId)
    const customer = await this.findCustomerById(userId);

    // Verifica se o email já está em uso por outro cliente
    const customerByEmail = await this.findUserByEmail(
      customerUpdate.email,
    ).catch(() => undefined);

    // Se encontrar um cliente com o mesmo email e esse cliente não for o atual (diferente de userId)
    if (customerByEmail && customerByEmail.id !== customer.id) {
      throw new BadRequestException('Email already registered in the system');
    }

    // Atualiza os dados do cliente
    return this.customerRepository.save({
      ...customer, // Pega os dados atuais do cliente
      ...customerUpdate, // Sobrescreve os dados com os novos valores
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

  async checkEmail(customerEmail: CustomerEmail) {
    if (!process.env.USER_EMAIL) {
      throw new UnauthorizedException();
    }
    const user = await this.userService.findUserByEmail(process.env.USER_EMAIL);
    const customer = await this.customerRepository.findOne({
      where: {
        email: customerEmail.email,
        userId: user.id,
      },
    });
    if (customer) {
      return {
        status: 'registered_user',
      };
    }
    return {
      status: 'unregistered_user',
    };
  }
}
