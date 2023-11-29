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

  @IsInt()
  vlaLevel: number;

  @IsInt()
  vlanLevel: number;

  @IsString()
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
