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

  @Column('jsonb', { name: 'media_order' })
  mediaOrder: object[];

  @Column('jsonb', { name: 'stretches_order' })
  stretchesOrder: object[];

  @Column('jsonb', { name: 'heating_order' })
  heatingOrder: object[];

  @Column('jsonb', { name: 'exercise_info' })
  exerciseInfo: object[];

  @Column({ type: 'text', array: true, default: () => "'{}'", name: 'tags' })
  tags: string[];

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @ManyToOne(() => ProgramEntity, (program) => program.trainings)
  @JoinColumn({ name: 'program_id', referencedColumnName: 'id' })
  program?: ProgramEntity;

  @ManyToMany(() => MediaEntity, (media) => media.trainings, {
    onDelete: 'CASCADE', // Exclusão em cascata da tabela intermediária
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
