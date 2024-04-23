import { CustomerEntity } from '../entities/customer.entity';

export class ReturnMyDataDto {
  id: number;
  name: string;
  email: string;
  avatar: string;
  constructor(customerEntity: CustomerEntity) {
    this.id = customerEntity.id;
    this.name = customerEntity.name;
    this.email = customerEntity.email;
    this.avatar = customerEntity.avatar;
  }
}
