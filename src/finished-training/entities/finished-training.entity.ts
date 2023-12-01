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

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
