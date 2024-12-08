import { TrainingEntity } from 'src/training/entities/training.entity';
import { WorkoutLoadEntity } from 'src/workout-load/entities/workout-load.entity';
import { WorkoutEntity } from 'src/workout/entities/workout.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
  OneToMany,
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

  @ManyToMany(() => TrainingEntity, (training) => training.medias)
  trainings: TrainingEntity[];

  @ManyToMany(() => WorkoutEntity, (workout) => workout.medias)
  workouts: WorkoutEntity[];

  @OneToMany(() => WorkoutLoadEntity, (workoutLoad) => workoutLoad.media)
  workoutLoads: WorkoutLoadEntity[];
}
