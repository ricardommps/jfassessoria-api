import { IsNumber, IsString, IsBoolean, IsOptional } from 'class-validator';

export class CreateUserDto {
  @IsString()
  name: string;

  @IsString()
  email: string;

  @IsNumber()
  typeUser: number;

  @IsOptional()
  @IsBoolean()
  temporaryPassword: boolean;

  @IsString()
  password: string;
}
