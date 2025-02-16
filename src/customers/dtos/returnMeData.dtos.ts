import { RatingEntity } from 'src/rating/entities/rating.entity';
import { CustomerEntity } from '../entities/customer.entity';

export class ReturnMeData {
  id: number;
  name: string;
  email: string;
  avatar: string;
  temporaryPassword: boolean;
  rating: RatingEntity;
  isYoungLife: boolean;
  phone: string;
  constructor(customerEntity: CustomerEntity) {
    this.id = customerEntity.id;
    this.name = customerEntity.name;
    this.email = customerEntity.email;
    this.avatar = customerEntity.avatar;
    this.temporaryPassword = customerEntity.temporaryPassword;
    this.rating = customerEntity.rating;
    this.isYoungLife = customerEntity.isYoungLife;
    this.phone = customerEntity.phone;
  }
}
