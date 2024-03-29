import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ProgramEntity } from '../../program/entities/program.entity';

@Entity({ name: 'training' })
export class TrainingEntity {
  @PrimaryGeneratedColumn('rowid')
  id: number;

  @Column({ name: 'program_id', nullable: false })
  programId: number;

  @Column({ name: 'name', nullable: true })
  name: string;

  @Column({ name: 'subtitle' })
  subtitle: string;

  @Column({ name: 'description', nullable: true })
  description: string;

  @Column({ name: 'cover_path' })
  coverPath: string;

  @Column({ name: 'date_published' })
  datePublished: Date;

  @Column({ name: 'training_date_other' })
  trainingDateOther: Date;

  @Column({ name: 'published' })
  published: boolean;

  @Column({ type: 'json', name: 'videos' })
  videos: [];

  @Column({ name: 'hide' })
  hide: boolean;

  @Column({ name: 'finished' })
  finished: boolean;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @ManyToOne(() => ProgramEntity, (program) => program.trainings, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'program_id', referencedColumnName: 'id' })
  program?: ProgramEntity;
}
