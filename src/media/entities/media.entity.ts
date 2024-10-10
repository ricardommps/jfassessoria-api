import { TrainingEntity } from 'src/training/entities/training.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'media' })
export class MediaEntity {
  @PrimaryGeneratedColumn('rowid')
  id: number;

  @Column({ name: 'user_id', nullable: false })
  userId: number;

  @Column({ name: 'title', nullable: false })
  title: string;

  @Column({ name: 'thumbnail', nullable: false })
  thumbnail: string;

  @Column({ name: 'video_url', nullable: false })
  videoUrl: string;

  @Column({ name: 'instrucctions' })
  instrucctions: string;

  @Column({ name: 'blocked', nullable: false })
  blocked: boolean;

  @Column({ type: 'text', array: true, default: () => "'{}'", name: 'tags' })
  tags: string[];

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @ManyToMany(() => TrainingEntity, (training) => training.medias, {
    onDelete: 'CASCADE',
    orphanedRowAction: 'delete',
  })
  @JoinTable()
  trainings: TrainingEntity[];
}
