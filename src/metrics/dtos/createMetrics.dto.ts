import { IsArray, IsInt, IsOptional, IsString } from 'class-validator';

export class CreateMetricsDto {
  @IsInt()
  customerId: number;

  @IsString()
  title: string;

  @IsString()
  type: string;

  @IsOptional()
  @IsString()
  module: string;

  @IsArray()
  chartData: [];
}
