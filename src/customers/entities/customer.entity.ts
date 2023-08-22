import { PaymentEntity } from '../../payment/entities/payment.entity';
import { ProgramEntity } from '../../program/entities/program.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'customer' })
export class CustomerEntity {
  @PrimaryGeneratedColumn('rowid')
  id: number;

  @Column({ name: 'user_id', nullable: false })
  userId: number;

  @Column({ name: 'name', nullable: false })
  name: string;

  @Column({ name: 'email', nullable: false })
  email: string;

  @Column({ name: 'password', nullable: false })
  password: string;

  @Column({ name: 'goal' })
  goal: string;

  @Column({ name: 'type_user', nullable: false })
  typeUser: number;

  @Column({ name: 'active', nullable: false })
  active: boolean;

  @Column({ name: 'is_runner', nullable: false })
  isRunner: boolean;

  @Column({ name: 'is_strength', nullable: false })
  isStrength: boolean;

  @Column({ name: 'expires_date' })
  expiresDate: Date;

  @Column({ name: 'gender', nullable: false })
  gender: string;

  @Column({ name: 'birth_date', nullable: false })
  birthDate: Date;

  @Column({ name: 'height' })
  height: number;

  @Column({ name: 'weight' })
  weight: number;

  @Column({ name: 'phone' })
  phone: string;

  @Column({ name: 'avatar' })
  avatar: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @OneToMany(() => ProgramEntity, (program) => program.customer)
  programs?: ProgramEntity[];

  @OneToMany(() => PaymentEntity, (payment) => payment.customer)
  payments?: PaymentEntity[];
}
