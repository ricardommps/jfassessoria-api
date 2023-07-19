import { ReturnProgramDto } from 'src/program/dtos/returnProgram.dto';
import { CustomerEntity } from '../entities/customer.entity';

export class ReturnCustomerIdDto {
  id: number;
  name: string;
  email: string;
  goal: string;
  typeUser: number;
  active: boolean;
  isRunner: boolean;
  isStrength: boolean;
  expiresDate: Date;
  gender: string;
  birthDate: Date;
  phone: string;
  programs: ReturnProgramDto[];
  constructor(customerEntity: CustomerEntity) {
    this.id = customerEntity.id;
    this.name = customerEntity.name;
    this.email = customerEntity.email;
    this.goal = customerEntity.goal;
    this.typeUser = customerEntity.typeUser;
    this.active = customerEntity.active;
    this.isRunner = customerEntity.isRunner;
    this.isStrength = customerEntity.isStrength;
    this.expiresDate = customerEntity.expiresDate;
    this.gender = customerEntity.gender;
    this.birthDate = customerEntity.birthDate;
    this.phone = customerEntity.phone;

    this.programs = customerEntity.programs
      ? customerEntity.programs.map((program) => new ReturnProgramDto(program))
      : undefined;
  }
}
