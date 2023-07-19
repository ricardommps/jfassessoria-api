import { CustomerEntity } from '../../customers/entities/customer.entity';
import { TrainingEntity } from '../../training/entities/training.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'program' })
export class ProgramEntity {
  @PrimaryGeneratedColumn('rowid')
  id: number;

  @Column({ name: 'customer_id', nullable: false })
  customerId: number;

  @Column({ name: 'active', nullable: false })
  active: boolean;

  @Column({ name: 'name', nullable: true })
  name: string;

  @Column({ name: 'goal' })
  goal: string;

  @Column({ name: 'difficulty_level', nullable: true })
  difficultyLevel: string;

  @Column({ name: 'reference_month' })
  referenceMonth: Date;

  @Column({ name: 'pv', nullable: true })
  pv: string;

  @Column({ name: 'pace', nullable: true })
  pace: string;

  @Column({ name: 'vlan', nullable: true })
  vlan: string;

  @Column({ name: 'pace_vlan', nullable: true })
  paceVlan: string;

  @Column({ name: 'vla', nullable: true })
  vla: string;

  @Column({ name: 'pace_vla', nullable: true })
  paceVla: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @ManyToOne(() => CustomerEntity, (customer) => customer.programs)
  @JoinColumn({ name: 'customer_id', referencedColumnName: 'id' })
  customer?: CustomerEntity;

  @OneToMany(() => TrainingEntity, (training) => training.program, {
    cascade: true,
  })
  trainings?: TrainingEntity[];
}
