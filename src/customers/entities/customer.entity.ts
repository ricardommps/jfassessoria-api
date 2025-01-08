import { RatingEntity } from 'src/rating/entities/rating.entity';
import { MetricsEntity } from '../../metrics/entities/metrics.entity';
import { PaymentEntity } from '../../payment/entities/payment.entity';
import { ProgramEntity } from '../../program/entities/program.entity';

import { AnamnesisEntity } from 'src/anamnese/entities/anamnese.entity';
import { NotificationEntity } from 'src/notification/entities/notification.entity';
import { PerformanceMetricsEntity } from 'src/performance_metrics/entities/performance_metrics.entity';
import { WorkoutLoadEntity } from 'src/workout-load/entities/workout-load.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  OneToOne,
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

  @Column('decimal', { precision: 5, scale: 2, nullable: true })
  height: number; // Permite até dois dígitos decimais

  @Column({ name: 'weight' })
  weight: number;

  @Column({ name: 'phone' })
  phone: string;

  @Column({ name: 'avatar' })
  avatar: string;

  @Column({ name: 'cloudinary_id' })
  cloudinaryId: string;

  @Column({ name: 'temporary_password' })
  temporaryPassword: boolean;

  @Column({ name: 'marital_status' })
  maritalStatus: string;

  @Column({ name: 'zip_code' })
  zipCode: string;

  @Column({ name: 'complement' })
  complement: string;

  @Column({ name: 'street' })
  street: string;

  @Column({ name: 'street_number' })
  streetNumber: string;

  @Column({ name: 'city' })
  city: string;

  @Column({ name: 'state' })
  state: string;

  @Column({ name: 'district' })
  district: string;

  @Column({ name: 'fat_percentage' })
  fatPercentage: string;

  @Column({ name: 'is_young_life', default: false })
  isYoungLife: boolean;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @OneToMany(
    () => NotificationEntity,
    (notification) => notification.recipientId,
  )
  notifications?: NotificationEntity[];

  @OneToMany(() => AnamnesisEntity, (anamnese) => anamnese.customer)
  anamneses?: AnamnesisEntity[];

  @OneToMany(() => PerformanceMetricsEntity, (item) => item.customer)
  performanceMetric?: PerformanceMetricsEntity[];

  @OneToMany(() => ProgramEntity, (program) => program.customer)
  programs?: ProgramEntity[];

  @OneToMany(() => PaymentEntity, (payment) => payment.customer)
  payments?: PaymentEntity[];

  @OneToMany(() => MetricsEntity, (metric) => metric.customer)
  metrics?: MetricsEntity[];

  @OneToOne(() => RatingEntity, (rating) => rating.customer)
  rating: RatingEntity;

  @OneToMany(() => WorkoutLoadEntity, (workoutLoad) => workoutLoad.customer)
  workoutLoads: WorkoutLoadEntity[];
}
