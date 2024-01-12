import { ReturnTrainingDto } from '../../training/dtos/returnTraining.dto';
import { FinishedTrainingEntity } from '../entities/finished-training.entity';

export class ReturnFinishedByIdDto {
  id: number;
  trainingId: number;
  distance: number;
  duration: number;
  pace: string;
  rpe: number;
  trimp: string;
  link: string;
  review: boolean;
  comments: string;
  unrealized: boolean;
  unitmeasurement: string;
  typetraining: string;
  intensities: string[];
  trainings?: ReturnTrainingDto[];
  constructor(finishedTrainingEntity: FinishedTrainingEntity) {
    this.id = finishedTrainingEntity.id;
    this.trainingId = finishedTrainingEntity.trainingId;
    this.distance = finishedTrainingEntity.distance;
    this.duration = finishedTrainingEntity.duration;
    this.pace = finishedTrainingEntity.pace;
    this.rpe = finishedTrainingEntity.rpe;
    this.trimp = finishedTrainingEntity.trimp;
    this.link = finishedTrainingEntity.link;
    this.comments = finishedTrainingEntity.comments;
    this.review = finishedTrainingEntity.review;
    this.unrealized = finishedTrainingEntity.unrealized;
    this.unitmeasurement = finishedTrainingEntity.unitmeasurement;
    this.intensities = finishedTrainingEntity.intensities;
    this.typetraining = finishedTrainingEntity.typetraining;
  }
}
