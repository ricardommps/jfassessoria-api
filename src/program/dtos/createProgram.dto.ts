import {
  IsBoolean,
  IsDateString,
  IsInt,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateProgramDto {
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

  @IsInt()
  @IsOptional()
  vlaLevel: number;

  @IsInt()
  @IsOptional()
  vlanLevel: number;

  @IsString()
  @IsOptional()
  paceVlan: string;

  @IsString()
  @IsOptional()
  vla: string;

  @IsString()
  @IsOptional()
  paceVla: string;

  @IsInt()
  @IsOptional()
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
}
