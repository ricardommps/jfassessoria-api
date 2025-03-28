import {
  IsBoolean,
  IsDateString,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateCustomersDto {
  @IsString()
  name: string;

  @IsString()
  email: string;

  @IsOptional()
  @IsString()
  goal: string;

  @IsBoolean()
  isRunner: boolean;

  @IsBoolean()
  isStrength: boolean;

  @IsBoolean()
  active: boolean;

  @IsOptional()
  @IsDateString()
  expiresDate: Date;

  @IsString()
  gender: string;

  @IsDateString()
  birthDate: Date;

  @IsOptional()
  @IsNumber()
  height: number;

  @IsOptional()
  @IsNumber()
  weight: number;

  @IsOptional()
  @IsString()
  phone: string;

  @IsOptional()
  @IsString()
  avatar: string;

  @IsOptional()
  @IsBoolean()
  temporaryPassword: string;

  @IsOptional()
  @IsBoolean()
  isYoungLife: string;
}
