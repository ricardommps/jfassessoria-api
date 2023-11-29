import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'training_feedback' })
export class TrainingFeedbackEntity {
  @PrimaryGeneratedColumn('rowid')
  id: number;

  @Column({ name: 'finished_training_id', nullable: false })
  finishedTrainingId: number;

  @Column({ name: 'description_feedback', nullable: false })
  descriptionFeedback: string;

  @Column('varchar', { name: 'paces', array: true })
  paces: string[];

  @Column({ name: 'viewed' })
  viewed: boolean;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
