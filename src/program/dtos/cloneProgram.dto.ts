import {
  IsArray,
  IsBoolean,
  IsDateString,
  IsInt,
  IsOptional,
  IsString,
} from 'class-validator';

export class CloneProgramDto {
  @IsString()
  name: string;

  @IsString()
  @IsOptional()
  goal: string;

  @IsDateString()
  @IsOptional()
  startDate: Date;

  @IsDateString()
  @IsOptional()
  endDate: Date;

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

  @IsInt()
  vlaLevel: number;

  @IsInt()
  vlanLevel: number;

  @IsString()
  paceVlan: string;

  @IsString()
  vla: string;

  @IsString()
  paceVla: string;

  @IsInt()
  customerId: number;

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
