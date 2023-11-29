import { ReturnCustomerDetailsDto } from '../../customers/dtos/returnCustomerDetails.dto';
import { ProgramEntity } from '../entities/program.entity';

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
  vlanLevel: number;
  vla: string;
  paceVla: string;
  vlaLevel: number;
  active: boolean;
  test: string;
  warningPdf: string;
  dateTest: Date;
  fcmValue: number;
  customerId: number;
  hide: boolean;
  type: number;
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
    this.vlanLevel = program.vlanLevel;
    this.vlaLevel = program.vlaLevel;
    this.warningPdf = program.warningPdf;
    this.fcmValue = program.fcmValue;
    this.hide = program.hide;
    this.type = program.type;

    this.customer = program.customer
      ? new ReturnCustomerDetailsDto(program.customer)
      : undefined;
  }
}
