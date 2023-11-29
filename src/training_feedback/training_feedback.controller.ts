import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { Roles } from '../decorators/roles.decorator';
import { UserType } from '../user/enum/user-type.enum';

import { CreateTrainingFeedbackDto } from './dtos/createTrainingFeedback.dto';
import { ReturnTrainingFeedbackDto } from './dtos/returnTrainingFeedback.dto';
import { TrainingFeedbackEntity } from './entities/training_feedback.entity';
import { TrainingFeedbackService } from './training_feedback.service';

@Controller('trainingfeedback')
export class TrainingFeedbackController {
  constructor(
    private readonly trainingFeedbackService: TrainingFeedbackService,
  ) {}

  @Roles(UserType.Admin, UserType.Root)
  @Get()
  async getAllTrainingFeedback(): Promise<ReturnTrainingFeedbackDto[]> {
    return (await this.trainingFeedbackService.getAllTrainingFeedback()).map(
      (item) => new ReturnTrainingFeedbackDto(item),
    );
  }

  @Roles(UserType.Admin, UserType.Root)
  @Post()
  @UsePipes(ValidationPipe)
  async createTraining(
    @Body() createTrainingFeedbackDto: CreateTrainingFeedbackDto,
  ): Promise<TrainingFeedbackEntity> {
    return this.trainingFeedbackService.createTrainingFeedback(
      createTrainingFeedbackDto,
    );
  }

  @Roles(UserType.Admin, UserType.Root, UserType.User)
  @UsePipes(ValidationPipe)
  @Put('')
  async updateFinishedTraining(
    @Body() updateTrainingFeedbackDto: CreateTrainingFeedbackDto,
  ): Promise<TrainingFeedbackEntity> {
    return this.trainingFeedbackService.updateTrainingFeedback(
      updateTrainingFeedbackDto,
    );
  }

  @Roles(UserType.Admin, UserType.Root, UserType.User)
  @Get('viewed/:id')
  async viewedFeedback(@Param('id') id: number) {
    return await this.trainingFeedbackService.viewedFeedback(id);
  }
}
