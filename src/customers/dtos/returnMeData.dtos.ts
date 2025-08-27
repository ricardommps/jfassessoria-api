import { CustomerEntity } from '../entities/customer.entity';

export class ReturnMeData {
  id: number;
  name: string;
  email: string;
  avatar: string;
  cpf: string;
  temporaryPassword: boolean;
  isYoungLife: boolean;
  phone: string;
  constructor(customerEntity: CustomerEntity) {
    this.id = customerEntity.id;
    this.name = customerEntity.name;
    this.email = customerEntity.email;
    this.avatar = customerEntity.avatar;
    this.temporaryPassword = customerEntity.temporaryPassword;
    this.isYoungLife = customerEntity.isYoungLife;
    this.phone = customerEntity.phone;
    this.cpf = customerEntity.cpf;
  }
}
