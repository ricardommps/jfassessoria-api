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
import { SendSuccess, TrainingService } from './training.service';
import { Roles } from '../decorators/roles.decorator';
import { UserType } from '../user/enum/user-type.enum';
import { ReturnTrainingDto } from './dtos/returnTraining,dto';
import { CreateTrainingDto } from './dtos/createTraining.dto';
import { TrainingEntity } from './entities/training.entity';
import { UpdateTrainingDto } from './dtos/updateTraining.dto';
import { SendTrainingDto } from './dtos/sendTraining.dto';
import { DeleteResult } from 'typeorm';

@Roles(UserType.Admin, UserType.Root)
@Controller('training')
export class TrainingController {
  constructor(private readonly trainingService: TrainingService) {}

  @Get('/program/:programId')
  async findTrainingsByProgramId(
    @Param('programId') programId,
  ): Promise<ReturnTrainingDto[]> {
    return (await this.trainingService.findTrainingsByProgramId(programId)).map(
      (training) => new ReturnTrainingDto(training),
    );
  }

  @Post()
  @UsePipes(ValidationPipe)
  async createTraining(
    @Body() createTrainingDto: CreateTrainingDto,
  ): Promise<TrainingEntity> {
    return this.trainingService.createTraining(createTrainingDto);
  }

  @Get('/:trainingId')
  async findProgramById(
    @Param('trainingId') trainingId,
  ): Promise<ReturnTrainingDto> {
    return await this.trainingService.findTrainingById(trainingId);
  }

  @UsePipes(ValidationPipe)
  @Put('/:trainingId')
  async updateTraining(
    @Body() updateTraining: UpdateTrainingDto,
    @Param('trainingId') trainingId: number,
  ): Promise<TrainingEntity> {
    return this.trainingService.updateTraining(updateTraining, trainingId);
  }

  @Post('/sendTraining')
  @UsePipes(ValidationPipe)
  async sendProgram(
    @Body() sendTrainingDto: SendTrainingDto,
  ): Promise<SendSuccess> {
    return this.trainingService.sendTraining(sendTrainingDto);
  }

  @Delete('/:trainingId')
  async deleteProduct(
    @Param('trainingId') trainingId: number,
  ): Promise<DeleteResult> {
    return this.trainingService.deleteTraining(trainingId);
  }
}
