import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MediaEntity } from 'src/media/entities/media.entity';
import { ProgramModule } from 'src/program/program.module';
import { WorkoutLoadModule } from 'src/workout-load/workout-load.module';
import { WorkoutEntity } from './entities/workout.entity';
import { WorkoutController } from './workout.controller';
import { WorkoutService } from './workout.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([WorkoutEntity, MediaEntity]),
    forwardRef(() => ProgramModule),
    forwardRef(() => WorkoutLoadModule),
  ],
  providers: [WorkoutService],
  controllers: [WorkoutController],
  exports: [WorkoutService],
})
export class WorkoutModule {}
