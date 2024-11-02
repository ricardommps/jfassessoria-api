import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { Roles } from 'src/decorators/roles.decorator';
import { UserId } from 'src/decorators/user-id.decorator';
import { UserType } from 'src/user/enum/user-type.enum';
import { WorkoutLoadEntity } from './entities/workout-load.entity';
import { WorkoutLoadService } from './workout-load.service';

@Controller('workout-load')
export class WorkoutLoadController {
  constructor(private readonly workoutLoadService: WorkoutLoadService) {}

  @Roles(UserType.Admin, UserType.Root, UserType.User)
  @Get('/:mediaId')
  async getWorkoutLoads(
    @UserId() userId: number,
    @Param('mediaId') mediaId: number,
  ): Promise<WorkoutLoadEntity[]> {
    return this.workoutLoadService.getWorkoutLoadsByCustomerAndMedia(
      userId,
      mediaId,
    );
  }

  @Roles(UserType.Admin, UserType.Root)
  @Get('/:customerId/:mediaId')
  async getWorkoutLoadsAdmin(
    @Param('customerId') customerId: number,
    @Param('mediaId') mediaId: number,
  ): Promise<WorkoutLoadEntity[]> {
    return this.workoutLoadService.getWorkoutLoadsByCustomerAndMedia(
      customerId,
      mediaId,
    );
  }

  @Roles(UserType.Admin, UserType.Root)
  @Post('/:customerId/:mediaId')
  async createWorkoutLoadAdmin(
    @Param('customerId') customerId: number,
    @Param('mediaId') mediaId: number,
    @Body('load') load: string,
  ): Promise<WorkoutLoadEntity> {
    return this.workoutLoadService.createWorkoutLoad(customerId, mediaId, load);
  }

  @Roles(UserType.Admin, UserType.Root, UserType.User)
  @Post('/:mediaId')
  async createWorkoutLoad(
    @UserId() userId: number,
    @Param('mediaId') mediaId: number,
    @Body('load') load: string,
  ): Promise<WorkoutLoadEntity> {
    return this.workoutLoadService.createWorkoutLoad(userId, mediaId, load);
  }
}
