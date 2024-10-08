import { ReturnPaymentDto } from '../../payment/dtos/returnPayment.dto';
import { ReturnProgramDto } from '../../program/dtos/returnProgram.dto';
import { CustomerEntity } from '../entities/customer.entity';

export class ReturnCustomerDto {
  id: number;
  name: string;
  email: string;
  active: boolean;
  isRunner: boolean;
  isStrength: boolean;
  phone: string;
  birthDate: Date;
  temporaryPassword: boolean;
  programs: ReturnProgramDto[];
  payments: ReturnPaymentDto[];
  anamnesisRead?: boolean;
  hasAnamneses?: boolean;
  constructor(customerEntity: CustomerEntity) {
    this.id = customerEntity.id;
    this.name = customerEntity.name;
    this.active = customerEntity.active;
    this.email = customerEntity.email;
    this.phone = customerEntity.phone;
    this.birthDate = customerEntity.birthDate;
    this.isRunner = customerEntity.isRunner;
    this.isStrength = customerEntity.isStrength;
    this.temporaryPassword = customerEntity.temporaryPassword;
    this.programs = customerEntity.programs
      ? customerEntity.programs.map((program) => new ReturnProgramDto(program))
      : undefined;

    this.payments = customerEntity.payments
      ? customerEntity.payments.map((payment) => new ReturnPaymentDto(payment))
      : undefined;

    this.hasAnamneses =
      customerEntity.anamneses && customerEntity.anamneses.length > 0;
    this.anamnesisRead = customerEntity.anamneses?.[0]?.read || false;
  }
}
