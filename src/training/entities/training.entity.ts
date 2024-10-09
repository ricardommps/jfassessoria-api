import { MediaEntity } from 'src/media/entities/media.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
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

  @Column({ name: 'heating' })
  heating: string;

  @Column({ name: 'recovery' })
  recovery: string;

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

  @Column('integer', { name: 'media_order', array: true })
  mediaOrder: number[];

  @Column('integer', { name: 'stretches_order', array: true })
  stretchesOrder: number[];

  @Column('jsonb', { name: 'exercise_info' })
  exerciseInfo: object[];

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @ManyToOne(() => ProgramEntity, (program) => program.trainings)
  @JoinColumn({ name: 'program_id', referencedColumnName: 'id' })
  program?: ProgramEntity;

  @ManyToMany(() => MediaEntity, (media) => media.trainings, {
    cascade: true,
    onDelete: 'CASCADE',
    orphanedRowAction: 'delete',
  })
  @JoinTable({
    name: 'training_media',
    joinColumn: {
      name: 'training_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'media_id',
      referencedColumnName: 'id',
    },
  })
  medias: MediaEntity[];
}
