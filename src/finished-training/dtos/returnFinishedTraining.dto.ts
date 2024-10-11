import { ReturnTrainingDto } from '../../training/dtos/returnTraining.dto';
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
  comments: string;
  unrealized: boolean;
  unitmeasurement: string;
  typetraining: string;
  intensities: string[];
  distanceInMeters: number;
  durationInSeconds: number;
  paceInSeconds: number;
  training?: ReturnTrainingDto;
  constructor(finishedTrainingEntity: FinishedTrainingEntity) {
    this.id = finishedTrainingEntity.id;
    this.trainingId = finishedTrainingEntity.trainingId;
    this.distance = finishedTrainingEntity.distance;
    this.duration = finishedTrainingEntity.duration;
    this.pace = finishedTrainingEntity.pace;
    this.rpe = finishedTrainingEntity.rpe;
    this.trimp = finishedTrainingEntity.trimp;
    this.link = finishedTrainingEntity.link;
    this.review = finishedTrainingEntity.review;
    this.comments = finishedTrainingEntity.comments;
    this.unrealized = finishedTrainingEntity.unrealized;
    this.unitmeasurement = finishedTrainingEntity.unitmeasurement;
    this.intensities = finishedTrainingEntity.intensities;
    this.typetraining = finishedTrainingEntity.typetraining;
    this.distanceInMeters = finishedTrainingEntity.distanceInMeters;
    this.durationInSeconds = finishedTrainingEntity.durationInSeconds;
    this.paceInSeconds = finishedTrainingEntity.paceInSeconds;
  }
}
