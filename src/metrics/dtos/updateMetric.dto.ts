import {
  IsArray,
  IsBoolean,
  IsInt,
  IsOptional,
  IsString,
} from 'class-validator';

export class UpdateMetricsDto {
  @IsInt()
  customerId: number;

  @IsString()
  title: string;

  @IsString()
  type: string;

  @IsOptional()
  @IsString()
  module: string;

  @IsBoolean()
  view: boolean;

  @IsArray()
  chartData: [];
}
