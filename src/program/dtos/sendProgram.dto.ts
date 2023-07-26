import {
  IsArray,
  IsBoolean,
  IsDateString,
  IsOptional,
  IsString,
} from 'class-validator';

export class SendProgramDto {
  @IsString()
  name: string;

  @IsString()
  @IsOptional()
  goal: string;

  @IsString()
  difficultyLevel: string;

  @IsDateString()
  @IsOptional()
  referenceMonth: Date;

  @IsString()
  pv: string;

  @IsString()
  pace: string;

  @IsString()
  vlan: string;

  @IsString()
  paceVlan: string;

  @IsString()
  vla: string;

  @IsString()
  paceVla: string;

  @IsArray()
  customersId: [];

  @IsBoolean()
  active: boolean;

  @IsString()
  @IsOptional()
  test: string;

  @IsDateString()
  @IsOptional()
  dateTest: Date;

  @IsArray()
  trainings: [];
}
