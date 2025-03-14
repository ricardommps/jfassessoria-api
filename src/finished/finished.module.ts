import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NotificationModule } from 'src/notification/notification.module';
import { WorkoutModule } from 'src/workout/workout.module';
import { FinishedEntity } from './entities/finished.entity';
import { FinishedController } from './finished.controller';
import { FinishedService } from './finished.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([FinishedEntity]),
    forwardRef(() => WorkoutModule),
    forwardRef(() => NotificationModule),
  ],
  providers: [FinishedService],
  controllers: [FinishedController],
  exports: [FinishedService],
})
export class FinishedModule {}
