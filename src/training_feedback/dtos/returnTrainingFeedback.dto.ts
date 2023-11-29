import { TrainingFeedbackEntity } from '../entities/training_feedback.entity';

export class ReturnTrainingFeedbackDto {
  id: number;
  finishedTrainingId: number;
  descriptionFeedback: string;
  paces: string[];
  viewed: boolean;
  createdAt: Date;
  constructor(trainingFeedbackEntity: TrainingFeedbackEntity) {
    this.id = trainingFeedbackEntity.id;
    this.finishedTrainingId = trainingFeedbackEntity.finishedTrainingId;
    this.descriptionFeedback = trainingFeedbackEntity.descriptionFeedback;
    this.paces = trainingFeedbackEntity.paces;
    this.viewed = trainingFeedbackEntity.viewed;
    this.createdAt = trainingFeedbackEntity.createdAt;
  }
}
