import { FinishedTrainingEntity } from '../entities/finished-training.entity';

export class ReturnFinishedTrainingDto {
  id: number;
  trainingId: number;
  distance: number;
  duration: number;
  pace: string;
  rpe: number;
  trimp: string;
  link: string;
  review: boolean;
  constructor(finishedTrainingEntity: FinishedTrainingEntity) {
    this.id = finishedTrainingEntity.id;
    this.trainingId = finishedTrainingEntity.trainingId;
    this.distance = finishedTrainingEntity.distance;
    this.duration = finishedTrainingEntity.duration;
    this.pace = finishedTrainingEntity.pace;
    this.rpe = finishedTrainingEntity.rpe;
    this.trimp = finishedTrainingEntity.trimp;
    this.link = finishedTrainingEntity.link;
    this.review = this.review;
  }
}
