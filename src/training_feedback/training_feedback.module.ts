import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FinishedTrainingModule } from '../finished-training/finished-training.module';
import { TrainingModule } from '../training/training.module';
import { TrainingFeedbackEntity } from './entities/training_feedback.entity';
import { TrainingFeedbackController } from './training_feedback.controller';
import { TrainingFeedbackService } from './training_feedback.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([TrainingFeedbackEntity]),
    forwardRef(() => TrainingModule),
    forwardRef(() => FinishedTrainingModule),
  ],
  providers: [TrainingFeedbackService],
  controllers: [TrainingFeedbackController],
  exports: [TrainingFeedbackService],
})
export class TrainingFeedbackModule {}
