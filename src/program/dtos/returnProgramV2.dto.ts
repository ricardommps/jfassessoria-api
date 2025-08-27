import { ReturnTrainingDto } from '../../training/dtos/returnTraining.dto';
import { ProgramEntity } from '../entities/program.entity';

export class ReturnProgramV2Dto {
  id: number;
  name: string;
  goal: string;
  difficultyLevel: string;
  referenceMonth: Date;
  pv: string;
  pace: string;
  vlan: string;
  vlanLevel: number;
  vlaLevel: number;
  paceVlan: string;
  vla: string;
  paceVla: string;
  active: boolean;
  vs2: boolean;
  test: string;
  warningPdf: string;
  dateTest: Date;
  customerId: number;
  fcmValue: number;
  hide: boolean;
  type: number;
  startDate: Date;
  endDate: Date;
  additionalInformation: string;
  trainings?: ReturnTrainingDto[];
  workouts: boolean; // agora é boolean

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
    this.vs2 = program.vs2;
    this.test = program.test;
    this.dateTest = program.dateTest;
    this.customerId = program.customerId;
    this.vlanLevel = program.vlanLevel;
    this.vlaLevel = program.vlaLevel;
    this.warningPdf = program.warningPdf;
    this.fcmValue = program.fcmValue;
    this.hide = program.hide;
    this.type = program.type;
    this.startDate = program.startDate;
    this.endDate = program.endDate;
    this.additionalInformation = program.additionalInformation;

    this.trainings = program.trainings
      ? program.trainings.map((training) => new ReturnTrainingDto(training))
      : undefined;

    // agora retorna true/false em vez do array
    this.workouts = !!(program.workouts && program.workouts.length > 0);
  }
}
