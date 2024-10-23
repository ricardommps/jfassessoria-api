import { CustomerEntity } from 'src/customers/entities/customer.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'performance_metrics' })
export class PerformanceMetricsEntity {
  @PrimaryGeneratedColumn('rowid')
  id: number;

  @Column({ name: 'pv', nullable: true })
  pv: string;

  @Column({ name: 'pace_pv', nullable: true })
  pacePv: string;

  @Column({ name: 'vla_level', nullable: true })
  vlaLevel: string;

  @Column({ name: 'vlan_level', nullable: true })
  vlanLevel: string;

  @Column({ name: 'fcm', nullable: true })
  fcm: string;

  @Column({ name: 'vla', nullable: true })
  vla: string;

  @Column({ name: 'pace_vla', nullable: true })
  paceVla: string;

  @Column({ name: 'vlan', nullable: true })
  vlan: string;

  @Column({ name: 'pace_vlan', nullable: true })
  paceVlan: string;

  @Column({ name: 'test', nullable: true })
  test: string;

  @Column({ name: 'date_test', nullable: true })
  dateTest: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @Column({ name: 'customer_id', nullable: false })
  customerId: number;

  @ManyToOne(() => CustomerEntity, (customer) => customer.performanceMetric, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'customer_id', referencedColumnName: 'id' })
  customer?: CustomerEntity;
}
