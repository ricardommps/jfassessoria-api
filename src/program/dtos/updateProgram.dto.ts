import {
  IsBoolean,
  IsDateString,
  IsInt,
  IsOptional,
  IsString,
} from 'class-validator';

export class UpdateProgramDto {
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

  @IsInt()
  customerId: number;

  @IsBoolean()
  active: boolean;

  @IsBoolean()
  @IsOptional()
  vs2: boolean;

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

  @IsString()
  @IsOptional()
  additionalInformation: string;

  @IsInt()
  @IsOptional()
  type: number;
}
