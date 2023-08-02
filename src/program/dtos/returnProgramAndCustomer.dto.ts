import { ProgramEntity } from '../entities/program.entity';
import { ReturnCustomerDetailsDto } from 'src/customers/dtos/returnCustomerDetails.dto';

export class ReturnProgramAndCustomerDto {
  id: number;
  name: string;
  goal: string;
  difficultyLevel: string;
  referenceMonth: Date;
  pv: string;
  pace: string;
  vlan: string;
  paceVlan: string;
  vla: string;
  paceVla: string;
  active: boolean;
  test: string;
  dateTest: Date;
  customerId: number;
  customer?: ReturnCustomerDetailsDto;

  constructor(program: ProgramEntity) {
    this.id = program.id;
    this.name = program.name;
    this.goal = program.goal;
    this.difficultyLevel = program.difficultyLevel;
    this.referenceMonth = program.referenceMonth;
    this.pv = program.pv;
    this.pace = program.pace;
    this.vla = program.vla;
    this.paceVla = program.paceVla;
    this.vlan = program.vlan;
    this.paceVlan = program.paceVlan;
    this.active = program.active;
    this.test = program.test;
    this.dateTest = program.dateTest;
    this.customer = program.customer
      ? new ReturnCustomerDetailsDto(program.customer)
      : undefined;
  }
}
