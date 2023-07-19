import {
  Body,
  Controller,
  Get,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dtos/createUser.dto';
import { UserEntity } from './entities/user.entity';
import { ReturnUserDto } from './dtos/returnUser.dto';
import { Roles } from '../decorators/roles.decorator';
import { UserType } from './enum/user-type.enum';
import { UserMe } from '../decorators/user-id.decorator';
import { LoginPayload } from '../auth/dtos/loginPayload.dto';
import { CustomersService } from '../customers/customers.service';
import { ReturnMeDto } from './dtos/returnMe.dto';

@Controller('api/v2/user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly customerService: CustomersService,
  ) {}

  @UsePipes(ValidationPipe)
  @Post()
  async createUser(@Body() createUser: CreateUserDto): Promise<UserEntity> {
    return this.userService.createUser(createUser);
  }

  @Roles(UserType.Admin, UserType.Root)
  @Get()
  async getAlluser(): Promise<ReturnUserDto[]> {
    return (await this.userService.getAllUser()).map(
      (userEntity) => new ReturnUserDto(userEntity),
    );
  }

  @Roles(UserType.Admin, UserType.Root, UserType.User)
  @Get('/me')
  async findUserById(@UserMe() userMe: LoginPayload): Promise<ReturnMeDto> {
    const { userId, typeUser } = userMe;
    if (typeUser === 1) {
      const userResult = new ReturnUserDto(
        await this.customerService.findCustomerById(userId),
      );
      return {
        user: {
          ...userResult,
        },
      };
    }
    const userResult = new ReturnUserDto(
      await this.userService.findUserById(userId),
    );
    return {
      user: {
        ...userResult,
      },
    };
  }
}
