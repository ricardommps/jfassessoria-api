import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TrainingModule } from '../training/training.module';
import { FinishedTrainingEntity } from './entities/finished-training.entity';
import { FinishedTrainingController } from './finished-training.controller';
import { FinishedTrainingService } from './finished-training.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([FinishedTrainingEntity]),
    forwardRef(() => TrainingModule),
  ],
  providers: [FinishedTrainingService],
  controllers: [FinishedTrainingController],
  exports: [FinishedTrainingService],
})
export class FinishedTrainingModule {}
