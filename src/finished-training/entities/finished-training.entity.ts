import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'finished_training' })
export class FinishedTrainingEntity {
  @PrimaryGeneratedColumn('rowid')
  id: number;

  @Column({ name: 'training_id', nullable: false })
  trainingId: number;

  @Column({ name: 'distance', nullable: false })
  distance: number;

  @Column({ name: 'duration', nullable: false })
  duration: number;

  @Column({ name: 'pace', nullable: false })
  pace: string;

  @Column({ name: 'rpe', nullable: false })
  rpe: number;

  @Column({ name: 'trimp', nullable: false })
  trimp: string;

  @Column({ name: 'link' })
  link: string;

  @Column({ name: 'review' })
  review: boolean;

  @Column({ name: 'comments' })
  comments: string;

  @Column({ name: 'unitmeasurement' })
  unitmeasurement: string;

  @Column({ name: 'typetraining' })
  typetraining: string;

  @Column('varchar', { name: 'intensities', array: true })
  intensities: string[];

  @Column({ name: 'unrealized' })
  unrealized: boolean;

  @Column({
    name: 'distance_in_meters',
    type: 'numeric',
    precision: 10,
    scale: 2,
    nullable: true,
  })
  distanceInMeters: number;

  @Column({
    name: 'duration_in_seconds',
    type: 'numeric',
    precision: 10,
    scale: 2,
    nullable: true,
  })
  durationInSeconds: number;

  @Column({
    name: 'pace_in_seconds',
    type: 'numeric',
    precision: 10,
    scale: 2,
    nullable: true,
  })
  paceInSeconds: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
