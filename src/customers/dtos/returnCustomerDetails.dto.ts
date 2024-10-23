import { AnamneseDto } from 'src/anamnese/dtos/anamnese.dtos';
import { CustomerEntity } from '../entities/customer.entity';

export class ReturnCustomerDetailsDto {
  id: number;
  name: string;
  email: string;
  isRunner: boolean;
  isStrength: boolean;
  phone: string;
  birthDate: Date;
  active: boolean;
  temporaryPassword: boolean;
  gender: string;
  height: number;
  weight: number;
  maritalStatus: string;
  zipCode: string;
  complement: string;
  street: string;
  streetNumber: string;
  city: string;
  state: string;
  district: string;
  fatPercentage: string;
  anamneses?: AnamneseDto[];
  constructor(customerEntity: CustomerEntity) {
    this.id = customerEntity.id;
    this.name = customerEntity.name;
    this.email = customerEntity.email;
    this.phone = customerEntity.phone;
    this.birthDate = customerEntity.birthDate;
    this.isRunner = customerEntity.isRunner;
    this.isStrength = customerEntity.isStrength;
    this.active = customerEntity.active;
    this.temporaryPassword = customerEntity.temporaryPassword;
    this.gender = customerEntity.gender;
    this.height = customerEntity.height;
    this.weight = customerEntity.weight;
    this.maritalStatus = customerEntity.maritalStatus;
    this.zipCode = customerEntity.zipCode;
    this.complement = customerEntity.complement;
    this.street = customerEntity.street;
    this.streetNumber = customerEntity.streetNumber;
    this.city = customerEntity.city;
    this.state = customerEntity.state;
    this.district = customerEntity.district;
    this.fatPercentage = customerEntity.fatPercentage;
    this.anamneses = customerEntity.anamneses
      ? customerEntity.anamneses.map((anamnese) => new AnamneseDto(anamnese))
      : undefined;
  }
}
