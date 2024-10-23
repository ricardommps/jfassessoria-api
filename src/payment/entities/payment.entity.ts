import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { CustomerEntity } from '../../customers/entities/customer.entity';

@Entity({ name: 'payment' })
export class PaymentEntity {
  @PrimaryGeneratedColumn('rowid')
  id: number;

  @Column({ name: 'user_id', nullable: false })
  userId: number;

  @Column({ name: 'customer_id', nullable: false })
  customerId: number;

  @Column({ name: 'start_date', nullable: false })
  startDate: Date;

  @Column({ name: 'expires_date', nullable: false })
  expiresDate: Date;

  @Column({ name: 'due_date', nullable: false })
  dueDate: Date;

  @Column({
    name: 'value',
    type: 'decimal',
    precision: 10,
    scale: 2,
    default: 0.0,
    nullable: false,
  })
  value: number;

  @Column({ name: 'payment_date' })
  paymentDate: Date;

  @Column({ name: 'comments' })
  comments: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @ManyToOne(() => CustomerEntity, (customer) => customer.payments)
  @JoinColumn({ name: 'customer_id', referencedColumnName: 'id' })
  customer?: CustomerEntity;
}
