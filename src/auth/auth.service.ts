import { Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import { LoginDto } from './dtos/login.dto';
import { ReturnLogin } from './dtos/returnLogin.dto';
import { UserEntity } from 'src/user/entities/user.entity';
import { validatePassword } from 'src/utils/password';
import { LoginPayload } from './dtos/loginPayload.dto';
import { ReturnUserDto } from 'src/user/dtos/returnUser.dto';
import { CustomerEntity } from 'src/customers/entities/customer.entity';
import { CustomersService } from 'src/customers/customers.service';

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
      throw new NotFoundException('Email or password invalid');
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
    const isMatch = await validatePassword(
      loginDto.password,
      customer?.password || '',
    );
    if (!customer || !isMatch) {
      throw new NotFoundException('Email or password invalid');
    }
    return {
      accessToken: this.jwtService.sign({ ...new LoginPayload(customer) }),
      user: new ReturnUserDto(customer),
    };
  }
}
