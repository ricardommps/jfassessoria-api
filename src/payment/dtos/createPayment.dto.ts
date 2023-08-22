import {
  IsDateString,
  IsInt,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreatePaymentDto {
  @IsInt()
  customerId: number;

  @IsDateString()
  startDate: Date;

  @IsDateString()
  expiresDate: Date;

  @IsDateString()
  dueDate: Date;

  @IsNumber()
  value: number;

  @IsOptional()
  @IsDateString()
  paymentDate: Date;

  @IsOptional()
  @IsString()
  comments: string;
}
