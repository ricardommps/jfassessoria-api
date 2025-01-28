import { ReturnCustomerDetailsDto } from '../../customers/dtos/returnCustomerDetails.dto';
import { ReturnTrainingDto } from '../../training/dtos/returnTraining.dto';
import { ProgramEntity } from '../entities/program.entity';

export class ArchivedProgramDto {
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
  vs2: boolean;
  test: string;
  warningPdf: string;
  dateTest: Date;
  fcmValue: number;
  customerId: number;
  hide: boolean;
  type: number;
  startDate: Date;
  endDate: Date;
  additionalInformation: string;
  customer?: ReturnCustomerDetailsDto;
  trainings?: ReturnTrainingDto[];

  constructor(program: ProgramEntity) {
    this.id = program.id;
    this.name = program.name;
    this.goal = program.goal;
    this.customerId = program.customerId;
    this.difficultyLevel = program.difficultyLevel;
    this.referenceMonth = program.referenceMonth;
    this.pv = program.pv;
    this.pace = program.pace;
    this.vla = program.vla;
    this.paceVla = program.paceVla;
    this.vlan = program.vlan;
    this.paceVlan = program.paceVlan;
    this.active = program.active;
    this.vs2 = program.vs2;
    this.test = program.test;
    this.dateTest = program.dateTest;
    this.vlanLevel = program.vlanLevel;
    this.vlaLevel = program.vlaLevel;
    this.warningPdf = program.warningPdf;
    this.fcmValue = program.fcmValue;
    this.hide = program.hide;
    this.type = program.type;
    this.startDate = program.startDate;
    this.endDate = program.endDate;
    this.additionalInformation = program.additionalInformation;

    this.customer = program.customer
      ? new ReturnCustomerDetailsDto(program.customer)
      : undefined;

    this.trainings = program.trainings
      ? program.trainings.map((training) => new ReturnTrainingDto(training))
      : undefined;
  }
}
