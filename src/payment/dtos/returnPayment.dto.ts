import { PaymentEntity } from '../entities/payment.entity';

export class ReturnPaymentDto {
  id: number;
  userId: number;
  customerId: number;
  startDate: Date;
  expiresDate: Date;
  value: number;
  paymentDate: Date;
  comments: string;
  updatedAt: Date;
  dueDate: Date;

  constructor(paymentEntity: PaymentEntity) {
    this.id = paymentEntity.id;
    this.userId = paymentEntity.userId;
    this.customerId = paymentEntity.customerId;
    this.startDate = paymentEntity.startDate;
    this.expiresDate = paymentEntity.expiresDate;
    this.value = paymentEntity.value;
    this.paymentDate = paymentEntity.paymentDate;
    this.comments = paymentEntity.comments;
    this.updatedAt = paymentEntity.updatedAt;
    this.dueDate = paymentEntity.dueDate;
  }
}
