import {
  Body,
  Controller,
  Get,
  Patch,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ReturnCustomerMeDto } from 'src/customers/dtos/returnCustomerMeDto.dtos';
import { ReturnMeData } from 'src/customers/dtos/returnMeData.dtos';
import { LoginPayload } from '../auth/dtos/loginPayload.dto';
import { CustomersService } from '../customers/customers.service';
import { Roles } from '../decorators/roles.decorator';
import { UserId, UserMe } from '../decorators/user-id.decorator';
import { CreateUserDto } from './dtos/createUser.dto';
import { ReturnMeDto } from './dtos/returnMe.dto';
import { ReturnUserDto } from './dtos/returnUser.dto';
import { UpdatePasswordDTO } from './dtos/update-password.dto';
import { UserEntity } from './entities/user.entity';
import { UserType } from './enum/user-type.enum';
import { UserService } from './user.service';

@Controller('user')
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

  @Roles(UserType.Admin, UserType.Root)
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

  @Roles(UserType.Admin, UserType.Root, UserType.User)
  @Get('/customer/me')
  async customerMe(
    @UserMe() userMe: LoginPayload,
  ): Promise<ReturnCustomerMeDto | ReturnMeDto> {
    const { userId, typeUser, password } = userMe;
    if (typeUser === 1) {
      const userResult = new ReturnMeData(
        await this.customerService.customerMe(userId, password),
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

  @Roles(UserType.Admin, UserType.Root, UserType.User)
  @Patch()
  @UsePipes(ValidationPipe)
  async updatePasswordUser(
    @Body() updatePasswordDTO: UpdatePasswordDTO,
    @UserId() userId: number,
  ): Promise<UserEntity> {
    return this.userService.updatePasswordUser(updatePasswordDTO, userId);
  }
}
