import { ReturnTrainingDto } from '../../training/dtos/returnTraining,dto';
import { ProgramEntity } from '../entities/program.entity';

export class ReturnProgramDto {
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
  trainings?: ReturnTrainingDto[];

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

    this.trainings = program.trainings
      ? program.trainings.map((training) => new ReturnTrainingDto(training))
      : undefined;
  }
}
