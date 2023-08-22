import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { Roles } from 'src/decorators/roles.decorator';
import { UserType } from 'src/user/enum/user-type.enum';
import { PaymentService } from './payment.service';
import { ReturnPaymentDto } from './dtos/returnPayment.dto';
import { UserId } from 'src/decorators/user-id.decorator';
import { CreatePaymentDto } from './dtos/createPayment.dto';
import { PaymentEntity } from './entities/payment.entity';
import { DeleteResult } from 'typeorm';

@Roles(UserType.Admin, UserType.Root)
@Controller('payment')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Get('/:customerId')
  async findProgramById(
    @Param('customerId') customerId,
  ): Promise<ReturnPaymentDto[]> {
    return await this.paymentService.findPaymentByCustomerId(customerId);
  }

  @UsePipes(ValidationPipe)
  @Post()
  async createPayment(
    @Body() createPayment: CreatePaymentDto,
    @UserId() userId: number,
  ): Promise<PaymentEntity> {
    return this.paymentService.createPayment(createPayment, userId);
  }

  @UsePipes(ValidationPipe)
  @Put('/:paymentId')
  async updateProduct(
    @Body() updatePayment: CreatePaymentDto,
    @Param('paymentId') paymentId: number,
  ): Promise<PaymentEntity> {
    return this.paymentService.updatePayment(updatePayment, paymentId);
  }

  @Delete('/:paymentId')
  async deletePayment(
    @Param('paymentId') paymentId: number,
  ): Promise<DeleteResult> {
    return this.paymentService.deletePayment(paymentId);
  }
}
