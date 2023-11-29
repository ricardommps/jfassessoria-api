import {
  IsArray,
  IsBoolean,
  IsDateString,
  IsInt,
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
  @IsOptional()
  difficultyLevel: string;

  @IsDateString()
  @IsOptional()
  referenceMonth: Date;

  @IsString()
  @IsOptional()
  pv: string;

  @IsString()
  @IsOptional()
  pace: string;

  @IsString()
  @IsOptional()
  vlan: string;

  @IsString()
  @IsOptional()
  paceVlan: string;

  @IsString()
  @IsOptional()
  vla: string;

  @IsInt()
  @IsOptional()
  vlaLevel: number;

  @IsInt()
  @IsOptional()
  vlanLevel: number;

  @IsString()
  @IsOptional()
  paceVla: string;

  @IsArray()
  customersId: [];

  @IsBoolean()
  active: boolean;

  @IsString()
  @IsOptional()
  test: string;

  @IsString()
  @IsOptional()
  warningPdf: string;

  @IsInt()
  @IsOptional()
  fcmValue: number;

  @IsDateString()
  @IsOptional()
  dateTest: Date;

  @IsBoolean()
  @IsOptional()
  hide: boolean;

  @IsInt()
  @IsOptional()
  type: number;

  @IsArray()
  trainings: [];
}
