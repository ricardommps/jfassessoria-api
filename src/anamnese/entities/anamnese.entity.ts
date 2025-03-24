import { CustomerEntity } from 'src/customers/entities/customer.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'anamnese' })
export class AnamnesisEntity {
  @PrimaryGeneratedColumn('rowid')
  id: number;

  @Column()
  customer_id: number; // Verifique se está corretamente definido como `number`.

  @Column({ name: 'has_diabetes_or_hypertension', nullable: false })
  hasDiabetesOrHypertension: string;

  @Column({ name: 'pain_or_injuries', nullable: false })
  painOrInjuries: string;

  @Column({ name: 'you_surgery', nullable: false })
  youSurgery: string;

  @Column({ name: 'heart_disease', nullable: false })
  heartDisease: string;

  @Column({ name: 'is_pregnant', nullable: false })
  isPregnant: boolean;

  @Column({ name: 'medications_or_supplements', nullable: false })
  medicationsOrSupplements: string;

  @Column({ name: 'etilismo', nullable: false })
  etilismo: string;

  @Column({ name: 'smoking', nullable: false })
  smoking: string;

  @Column({ name: 'food', nullable: false })
  food: string;

  @Column({ name: 'is_vegetarian', nullable: false })
  isVegetarian: boolean;

  @Column({ name: 'is_vegan', nullable: false })
  isVegan: boolean;

  @Column({ name: 'physical_activity', nullable: false })
  physicalActivity: string;

  @Column({ name: 'intentions_starting_sports_consultancy', nullable: false })
  intentionsStartingSportsConsultancy: string;

  @Column({ name: 'looking_for_racing_advice', nullable: false })
  lookingForRacingAdvice: string;

  @Column({ name: 'running_experience', nullable: false })
  runningExperience: string;

  @Column({ name: 'strengthening_training', nullable: false })
  strengtheningTraining: string;

  @Column({ name: 'running_competition_experience', nullable: false })
  runningCompetitionExperience: string;

  @Column({ name: 'you_looking_for_race_consultancy', nullable: false })
  youLookingForRaceConsultancy: string;

  @Column({ name: 'running_events_future', nullable: false })
  runningEventsFuture: string;

  @Column({ name: 'race_on_your_future_calendar', nullable: false })
  raceOnYourFutureCalendar: string;

  @Column({ name: 'days_of_the_week_run', nullable: false })
  daysOfTheWeekRun: string;

  @Column({ name: 'has_running_clock', nullable: false })
  hasRunningClock: string;

  @Column({ name: 'longest_running_distance' })
  longestRunningDistance: string;

  @Column({ name: 'best_running_time' })
  bestRunningTime: string;

  @Column({ name: 'disease' })
  disease: string;

  @Column({ name: 'days_the_week_sports_consultancy' })
  daysTheWeekSportsConsultancy: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @Column({ name: 'read' })
  read: boolean;

  @ManyToOne(() => CustomerEntity, (customer) => customer.anamneses, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'customer_id', referencedColumnName: 'id' })
  customer: CustomerEntity;
}
