import { CustomerEntity } from 'src/customers/entities/customer.entity';
import { MediaEntity } from 'src/media/entities/media.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('workout_load')
export class WorkoutLoadEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  customer_id: number;

  @Column()
  media_id: number;

  @Column()
  load: string;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updated_at: Date;

  @ManyToOne(() => CustomerEntity, (customer) => customer.workoutLoads, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'customer_id', referencedColumnName: 'id' })
  customer: CustomerEntity;

  @ManyToOne(() => MediaEntity, (media) => media.workoutLoads, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'media_id', referencedColumnName: 'id' })
  media: MediaEntity;
}
