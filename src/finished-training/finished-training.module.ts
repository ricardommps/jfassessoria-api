import { Module, forwardRef } from '@nestjs/common';
import { FinishedTrainingService } from './finished-training.service';
import { FinishedTrainingController } from './finished-training.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FinishedTrainingEntity } from './entities/finished-training.entity';
import { TrainingModule } from 'src/training/training.module';

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
