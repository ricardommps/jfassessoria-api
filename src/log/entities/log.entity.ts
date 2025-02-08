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

@Entity({ name: 'log' })
export class LogEntity {
  @PrimaryGeneratedColumn('rowid')
  id: number;

  @Column({ name: 'customer_id' })
  customerId: number;

  @Column({ name: 'type_log' })
  typeLog: string;

  @Column({ name: 'error_str' })
  errorStr: string;

  @Column({ name: 'error_message' })
  errorMessage: string;

  @Column({ name: 'error_url', nullable: true })
  errorUrl: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @ManyToOne(() => CustomerEntity, (customer) => customer.logs, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'customer_id', referencedColumnName: 'id' })
  customer?: CustomerEntity;
}
