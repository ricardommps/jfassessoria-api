import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { CustomerEntity } from '../../customers/entities/customer.entity';

@Entity({ name: 'rating' })
export class RatingEntity {
  @PrimaryGeneratedColumn('rowid')
  id: number;

  @Column({ name: 'customer_id', nullable: false })
  customerId: number;

  @Column({ name: 'rating_app' })
  ratingApp: number;

  @Column({ name: 'comments_rating_app' })
  commentsRatingApp: string;

  @Column({ name: 'rating_trainings' })
  ratingTrainings: number;

  @Column({ name: 'comments_rating_trainings' })
  commentsRatingTrainings: string;

  @Column({ name: 'testimony' })
  testimony: string;

  @Column({ name: 'not_rating' })
  notRating: boolean;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @OneToOne(() => CustomerEntity, (customer) => customer.rating, {
    onDelete: 'CASCADE',
    cascade: ['insert', 'update'],
  })
  @JoinColumn({ name: 'customer_id', referencedColumnName: 'id' })
  customer: CustomerEntity;
}
