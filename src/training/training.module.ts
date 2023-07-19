import { Module, forwardRef } from '@nestjs/common';
import { TrainingEntity } from './entities/training.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TrainingService } from './training.service';
import { TrainingController } from './training.controller';
import { ProgramModule } from 'src/program/program.module';

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
