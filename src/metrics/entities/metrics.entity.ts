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

@Entity({ name: 'metrics' })
export class MetricsEntity {
  @PrimaryGeneratedColumn('rowid')
  id: number;

  @Column({ name: 'customer_id', nullable: false })
  customerId: number;

  @Column({ name: 'title', nullable: true })
  title: string;

  @Column({ name: 'type' })
  type: string;

  @Column({ name: 'module' })
  module: string;

  @Column('jsonb', { name: 'chartdata', nullable: true })
  chartData?: object[];

  @Column({ name: 'view' })
  view: boolean;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @ManyToOne(() => CustomerEntity, (customer) => customer.programs)
  @JoinColumn({ name: 'customer_id', referencedColumnName: 'id' })
  customer?: CustomerEntity;
}
