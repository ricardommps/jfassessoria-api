import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProgramModule } from 'src/program/program.module';
import { TrainingFeedbackModule } from 'src/training_feedback/training_feedback.module';
import { TrainingModule } from '../training/training.module';
import { FinishedTrainingEntity } from './entities/finished-training.entity';
import { FinishedTrainingController } from './finished-training.controller';
import { FinishedTrainingService } from './finished-training.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([FinishedTrainingEntity]),
    forwardRef(() => TrainingModule),
    forwardRef(() => ProgramModule),
    forwardRef(() => TrainingFeedbackModule),
  ],
  providers: [FinishedTrainingService],
  controllers: [FinishedTrainingController],
  exports: [FinishedTrainingService],
})
export class FinishedTrainingModule {}
