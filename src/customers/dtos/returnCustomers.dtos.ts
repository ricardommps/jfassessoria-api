import { ReturnProgramDto } from '../../program/dtos/returnProgram.dto';
import { CustomerEntity } from '../entities/customer.entity';

export class ReturnCustomerDto {
  id: number;
  name: string;
  email: string;
  isRunner: boolean;
  isStrength: boolean;
  phone: string;
  birthDate: Date;
  programs: ReturnProgramDto[];
  constructor(customerEntity: CustomerEntity) {
    this.id = customerEntity.id;
    this.name = customerEntity.name;
    this.email = customerEntity.email;
    this.phone = customerEntity.phone;
    this.birthDate = customerEntity.birthDate;
    this.isRunner = customerEntity.isRunner;
    this.isStrength = customerEntity.isStrength;
    this.programs = customerEntity.programs
      ? customerEntity.programs.map((program) => new ReturnProgramDto(program))
      : undefined;
  }
}
