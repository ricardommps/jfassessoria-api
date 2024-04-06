import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FinishedTrainingModule } from 'src/finished-training/finished-training.module';
import { MediaEntity } from 'src/media/entities/media.entity';
import { ProgramModule } from '../program/program.module';
import { TrainingEntity } from './entities/training.entity';
import { TrainingController } from './training.controller';
import { TrainingService } from './training.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([TrainingEntity, MediaEntity]),
    forwardRef(() => ProgramModule),
    forwardRef(() => FinishedTrainingModule),
  ],
  providers: [TrainingService],
  controllers: [TrainingController],
  exports: [TrainingService],
})
export class TrainingModule {}
