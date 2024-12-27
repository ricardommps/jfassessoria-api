import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { Roles } from 'src/decorators/roles.decorator';
import { UserType } from 'src/user/enum/user-type.enum';
import { WorkoutEntity } from './entities/workout.entity';
import { WorkoutService } from './workout.service';

@Controller('workout')
export class WorkoutController {
  constructor(private readonly workoutService: WorkoutService) {}

  @Roles(UserType.Admin, UserType.Root)
  @Post('')
  async createTrainingWithMedias(
    @Body() body: { workout; medias: number[] },
  ): Promise<any> {
    const { workout, medias } = body;
    return this.workoutService.create(workout, medias);
  }

  @Roles(UserType.Admin, UserType.Root, UserType.User)
  @Get('/running/:programId')
  async findWorkoutRunningByProgramId(@Param('programId') programId: number) {
    return await this.workoutService.findWorkoutRunningByProgramId(programId);
  }

  @Roles(UserType.Admin, UserType.Root, UserType.User)
  @Get('/running/:programId/user')
  async findWorkoutRunningByProgramIdUser(
    @Param('programId') programId: number,
  ) {
    return await this.workoutService.findWorkoutRunningByProgramIdUser(
      programId,
    );
  }

  @Roles(UserType.Admin, UserType.Root, UserType.User)
  @Get('/gym/:programId/user')
  async findWorkoutGymByProgramIdUser(@Param('programId') programId: number) {
    return await this.workoutService.findWorkoutGymByProgramIdUser(programId);
  }

  @Roles(UserType.Admin, UserType.Root, UserType.User)
  @Get('/:id')
  async findWorkouById(@Param('id') id: string): Promise<WorkoutEntity> {
    return this.workoutService.findWorkouById(+id);
  }

  @Roles(UserType.Admin, UserType.Root, UserType.User)
  @Get('/:customerId/:id')
  async findWorkouByIdFeedback(
    @Param('customerId') customerId: string,
    @Param('id') id: string,
  ): Promise<WorkoutEntity> {
    return this.workoutService.findWorkouByIdFeedBack(+customerId, +id);
  }

  @Roles(UserType.Admin, UserType.Root, UserType.User)
  @Get('/gym/:programId')
  async findWorkoutGymByProgramId(@Param('programId') programId: number) {
    return await this.workoutService.findWorkoutGymByProgramId(programId);
  }

  @Roles(UserType.Admin, UserType.Root)
  @Put('/:id')
  async updateWorkout(
    @Param('id') id: string,
    @Body() trainigeData: Partial<WorkoutEntity>,
  ): Promise<WorkoutEntity> {
    return this.workoutService.updateWorkout(+id, trainigeData);
  }

  @Roles(UserType.Admin, UserType.Root)
  @Delete('/:id')
  async deleteWorkout(@Param('id') id: string): Promise<WorkoutEntity> {
    return this.workoutService.deleteWorkout(+id);
  }

  @Roles(UserType.Admin, UserType.Root)
  @Post('/send')
  async sendWorkout(@Body() sendTrainingDto): Promise<void> {
    return this.workoutService.sendWorkout(sendTrainingDto);
  }

  @Roles(UserType.Admin, UserType.Root)
  @Get('/clone/:id')
  async cloneTrainingWithMedias(
    @Param('id') id: string,
    @Query('qntCopy') qntCopy: number,
  ): Promise<WorkoutEntity[]> {
    return this.workoutService.cloneWorkout(+id, qntCopy);
  }
}
