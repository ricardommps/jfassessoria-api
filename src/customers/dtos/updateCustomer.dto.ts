import {
  IsBoolean,
  IsDateString,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class UpdateCustomersDto {
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

  @IsOptional()
  @IsDateString()
  expiresDate: Date;

  @IsString()
  gender: string;

  @IsBoolean()
  active: boolean;

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
}
