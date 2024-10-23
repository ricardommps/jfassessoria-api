import {
  Body,
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dtos/login.dto';
import { ReturnLogin } from './dtos/returnLogin.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UsePipes(ValidationPipe)
  @Post()
  async login(@Body() loginDto: LoginDto): Promise<ReturnLogin> {
    return this.authService.login(loginDto);
  }

  @UsePipes(ValidationPipe)
  @Post('/customer/login')
  async customerLogin(@Body() loginDto: LoginDto): Promise<ReturnLogin> {
    return this.authService.customerLogin(loginDto);
  }

  @UsePipes(ValidationPipe)
  @Post('/customer/anamnese/login')
  async anamneseLogin(@Body() loginDto: LoginDto) {
    return this.authService.anamneseLogin(loginDto);
  }
}
