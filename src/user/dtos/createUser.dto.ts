import { IsNumber, IsString } from 'class-validator';

export class CreateUserDto {
  @IsString()
  name: string;

  @IsString()
  email: string;

  @IsNumber()
  typeUser: number;

  @IsString()
  password: string;
}
