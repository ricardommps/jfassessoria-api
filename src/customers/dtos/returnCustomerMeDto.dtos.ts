import { CustomerEntity } from '../entities/customer.entity';
interface User {
  id: number;
  name: string;
  email: string;
  temporaryPassword: boolean;
  avatar: string;
}

export class ReturnCustomerMeDto {
  user: User;
  constructor(customerEntity: CustomerEntity) {
    this.user.id = customerEntity.id;
    this.user.name = customerEntity.name;
    this.user.email = customerEntity.email;
    this.user.temporaryPassword = customerEntity.temporaryPassword;
    this.user.avatar = customerEntity.avatar;
  }
}
