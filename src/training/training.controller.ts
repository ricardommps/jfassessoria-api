import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { DeleteResult } from 'typeorm';
import { Roles } from '../decorators/roles.decorator';
import { UserType } from '../user/enum/user-type.enum';
import { CreateTrainingDto } from './dtos/createTraining.dto';
import { ReturnTrainingDto } from './dtos/returnTraining.dto';
import { SendTrainingDto } from './dtos/sendTraining.dto';
import { UpdateTrainingDto } from './dtos/updateTraining.dto';
import { TrainingEntity } from './entities/training.entity';
import { SendSuccess, TrainingService } from './training.service';

interface CloneItem {
  training: CreateTrainingDto;
  qnt: number;
}

@Controller('training')
export class TrainingController {
  constructor(private readonly trainingService: TrainingService) {}

  @Roles(UserType.Admin, UserType.Root, UserType.User)
  @Get('/programQueryBuilder/:programId')
  async findFinishedById(@Param('programId') programId: number) {
    return await this.trainingService.findTrainingsByProgramIdQueryBuilder(
      programId,
    );
  }

  @Roles(UserType.Admin, UserType.Root, UserType.User)
  @Get('/list/:programId')
  async findTrainingsNotFinished(@Param('programId') programId: number) {
    return await this.trainingService.findTrainingsNotFinished(programId);
  }

  @Roles(UserType.Admin, UserType.Root, UserType.User)
  @Get('/listfinished/:programId')
  async findTrainingsFinished(@Param('programId') programId: number) {
    return await this.trainingService.findTrainingsFinished(programId);
  }

  @Roles(UserType.Admin, UserType.Root)
  @Get('/program/:programId')
  async findTrainingsByProgramId(
    @Param('programId') programId,
  ): Promise<ReturnTrainingDto[]> {
    return (await this.trainingService.findTrainingsByProgramId(programId)).map(
      (training) => new ReturnTrainingDto(training),
    );
  }

  @Roles(UserType.Admin, UserType.Root)
  @Post()
  @UsePipes(ValidationPipe)
  async createTraining(
    @Body() createTrainingDto: CreateTrainingDto,
  ): Promise<TrainingEntity> {
    return this.trainingService.createTraining(createTrainingDto);
  }

  @Roles(UserType.Admin, UserType.Root)
  @Post('/clone')
  @UsePipes(ValidationPipe)
  async cloneTraining(@Body() cloneItem: CloneItem): Promise<DeleteResult> {
    return await this.trainingService.cloneTraining(cloneItem);
  }

  @Roles(UserType.Admin, UserType.Root)
  @Get('/:trainingId')
  async findProgramById(
    @Param('trainingId') trainingId,
  ): Promise<ReturnTrainingDto> {
    return await this.trainingService.findTrainingById(trainingId);
  }

  @Roles(UserType.Admin, UserType.Root)
  @UsePipes(ValidationPipe)
  @Put('/:trainingId')
  async updateTraining(
    @Body() updateTraining: UpdateTrainingDto,
    @Param('trainingId') trainingId: number,
  ): Promise<TrainingEntity> {
    return this.trainingService.updateTraining(updateTraining, trainingId);
  }

  @Roles(UserType.Admin, UserType.Root)
  @Post('/sendTraining')
  @UsePipes(ValidationPipe)
  async sendProgram(
    @Body() sendTrainingDto: SendTrainingDto,
  ): Promise<SendSuccess> {
    return this.trainingService.sendTraining(sendTrainingDto);
  }

  @Roles(UserType.Admin, UserType.Root)
  @Delete('/:trainingId')
  async deleteProduct(
    @Param('trainingId') trainingId: number,
  ): Promise<DeleteResult> {
    return this.trainingService.deleteTraining(trainingId);
  }

  @Roles(UserType.Admin, UserType.Root)
  @UsePipes(ValidationPipe)
  @Put('/hide/:trainingId')
  async hideTraining(
    @Param('trainingId') trainingId: number,
  ): Promise<TrainingEntity> {
    return this.trainingService.hideTraining(trainingId);
  }
}
