import { Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ReturnCustomerDetailsDto } from 'src/customers/dtos/returnCustomerDetails.dto';
import { CustomersService } from '../customers/customers.service';
import { CustomerEntity } from '../customers/entities/customer.entity';
import { ReturnUserDto } from '../user/dtos/returnUser.dto';
import { UserEntity } from '../user/entities/user.entity';
import { UserService } from '../user/user.service';
import { validatePassword } from '../utils/password';
import { LoginDto } from './dtos/login.dto';
import { LoginPayload } from './dtos/loginPayload.dto';
import { ReturnLogin } from './dtos/returnLogin.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly customerService: CustomersService,
    private jwtService: JwtService,
  ) {}

  async login(loginDto: LoginDto): Promise<ReturnLogin> {
    const user: UserEntity | undefined = await this.userService
      .findUserByEmail(loginDto.email)
      .catch(() => undefined);
    const isMatch = await validatePassword(
      loginDto.password,
      user?.password || '',
    );
    if (!user || !isMatch) {
      throw new NotFoundException('Email ou senha inválidos');
    }
    return {
      accessToken: this.jwtService.sign({ ...new LoginPayload(user) }),
      user: new ReturnUserDto(user),
    };
  }

  async customerLogin(loginDto: LoginDto): Promise<ReturnLogin> {
    const customer: CustomerEntity | undefined = await this.customerService
      .findCustomerByEmail(loginDto.email)
      .catch(() => undefined);

    if (!customer?.password && !customer?.adminPassword) {
      throw new NotFoundException('Email ou senha inválidos');
    }

    const isMatch =
      (customer.password &&
        (await validatePassword(loginDto.password, customer.password))) ||
      (customer.adminPassword &&
        (await validatePassword(loginDto.password, customer.adminPassword)));

    if (!customer || !isMatch) {
      throw new NotFoundException('Email ou senha inválidos');
    }

    return {
      accessToken: this.jwtService.sign({ ...new LoginPayload(customer) }),
      user: new ReturnUserDto(customer),
    };
  }

  async anamneseLogin(loginDto: LoginDto) {
    const customer: CustomerEntity | undefined = await this.customerService
      .findCustomerByEmailAnamnese(loginDto.email)
      .catch(() => undefined);
    if (!customer?.password) {
      throw new NotFoundException('Email ou senha inválidos');
    }
    const isMatch = await validatePassword(
      loginDto.password,
      customer?.password || '',
    );
    if (!customer || !isMatch) {
      throw new NotFoundException('Email ou senha inválidos');
    }
    //userId
    //password
    return {
      accessToken: this.jwtService.sign({ ...new LoginPayload(customer) }),
      customer: new ReturnCustomerDetailsDto(customer),
    };
  }
}
