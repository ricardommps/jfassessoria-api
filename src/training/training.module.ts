import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProgramModule } from '../program/program.module';
import { TrainingEntity } from './entities/training.entity';
import { TrainingController } from './training.controller';
import { TrainingService } from './training.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([TrainingEntity]),
    forwardRef(() => ProgramModule),
  ],
  providers: [TrainingService],
  controllers: [TrainingController],
  exports: [TrainingService],
})
export class TrainingModule {}
