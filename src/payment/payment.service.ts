import {
  Inject,
  Injectable,
  NotFoundException,
  forwardRef,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PaymentEntity } from './entities/payment.entity';
import { DeleteResult, Repository } from 'typeorm';
import { CreatePaymentDto } from './dtos/createPayment.dto';
import { UserService } from '../user/user.service';

@Injectable()
export class PaymentService {
  constructor(
    @InjectRepository(PaymentEntity)
    private readonly paymentRepository: Repository<PaymentEntity>,

    @Inject(forwardRef(() => UserService))
    private readonly userService: UserService,
  ) {}

  async findPaymentByCustomerId(customerId: number): Promise<PaymentEntity[]> {
    const customer = await this.paymentRepository.find({
      where: {
        customerId,
      },
      order: { startDate: 'DESC' },
    });
    return customer;
  }

  async findPaymentById(paymentId: number): Promise<PaymentEntity> {
    const payment = await this.paymentRepository.findOne({
      where: {
        id: paymentId,
      },
      order: { startDate: 'DESC' },
    });
    if (!payment) {
      throw new NotFoundException(`Payment id: ${paymentId} not found`);
    }
    return payment;
  }

  async createPayment(
    createPaymentDto: CreatePaymentDto,
    userId: number,
  ): Promise<PaymentEntity> {
    await this.userService.findUserById(userId);
    return this.paymentRepository.save({
      ...createPaymentDto,
      userId,
    });
  }

  async updatePayment(
    updatePayment: CreatePaymentDto,
    paymentId: number,
  ): Promise<PaymentEntity> {
    const payment = await this.findPaymentById(paymentId);

    return this.paymentRepository.save({
      ...payment,
      ...updatePayment,
    });
  }

  async deletePayment(paymentId: number): Promise<DeleteResult> {
    await this.findPaymentById(paymentId);
    return this.paymentRepository.delete({ id: paymentId });
  }
}
