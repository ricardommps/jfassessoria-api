import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { Roles } from '../decorators/roles.decorator';
import { UserId } from '../decorators/user-id.decorator';
import { UserType } from '../user/enum/user-type.enum';
import { CreateFinishedTrainingDto } from './dtos/createFinishedTraining.dto';
import { ReturnFinishedTrainingDto } from './dtos/returnFinishedTraining.dto';
import { FinishedTrainingEntity } from './entities/finished-training.entity';
import { FinishedTrainingService } from './finished-training.service';

@Controller('finishedtraining')
export class FinishedTrainingController {
  constructor(
    private readonly finishedTrainingService: FinishedTrainingService,
  ) {}

  @Roles(UserType.Admin, UserType.Root, UserType.User)
  @Get()
  async getAllFinished(): Promise<ReturnFinishedTrainingDto[]> {
    return (await this.finishedTrainingService.getAllFinished()).map(
      (item) => new ReturnFinishedTrainingDto(item),
    );
  }

  @Roles(UserType.Admin, UserType.Root, UserType.User)
  @UsePipes(ValidationPipe)
  @Post()
  async createFinished(
    @Body() createFinishedDto: CreateFinishedTrainingDto,
  ): Promise<ReturnFinishedTrainingDto> {
    return this.finishedTrainingService.createFinished(createFinishedDto);
  }

  @Roles(UserType.Admin, UserType.Root, UserType.User)
  @UsePipes(ValidationPipe)
  @Put('/update')
  async updateFinishedTraining(
    @Body() updateFinishedTrainingDto: CreateFinishedTrainingDto,
  ): Promise<FinishedTrainingEntity> {
    return this.finishedTrainingService.updateFinishedTraining(
      updateFinishedTrainingDto,
    );
  }

  @Roles(UserType.Admin, UserType.Root, UserType.User)
  @Get('listByProgramId/:id')
  async findFinishedByProgramId(@Param('id') id: string) {
    return await this.finishedTrainingService.findFinishedByProgramId(id);
  }

  @Roles(UserType.Admin, UserType.Root, UserType.User)
  @Get('listByUser')
  async findFinished(
    @UserId() userId: number,
    @Query('timestampFrom') timestampFrom?: string,
    @Query('timestampTo') timestampTo?: string,
  ) {
    return await this.finishedTrainingService.findFinished(
      userId,
      timestampFrom,
      timestampTo,
    );
  }

  @Roles(UserType.Admin, UserType.Root, UserType.User)
  @Get('/findById/:id')
  async findById(@Param('id') id: number) {
    return await this.finishedTrainingService.findById(id);
  }

  @Roles(UserType.Admin, UserType.Root)
  @Get('/review/:id')
  async findFinishedByReview(@Param('id') id: string) {
    return await this.finishedTrainingService.findFinishedByReview(id);
  }

  @Roles(UserType.Admin, UserType.Root, UserType.User)
  @Get('/review/done/:id')
  async findFinishedReviewDone(@Param('id') id: string) {
    return await this.finishedTrainingService.findFinishedReviewDone(id);
  }

  @Roles(UserType.Admin, UserType.Root, UserType.User)
  @Get('/review/training/:id')
  async findFinishedReviewById(@Param('id') id: number) {
    return await this.finishedTrainingService.finishedById(id);
  }

  @Roles(UserType.Admin, UserType.Root, UserType.User)
  @Get('/review/trainingId/:id')
  async findFinishedReviewId(@Param('id') id: number) {
    return await this.finishedTrainingService.finishedByTrainingId(id);
  }

  @Roles(UserType.Admin, UserType.Root, UserType.User)
  @Get(':id')
  async finishedByTrainingId(@Param('id') id: number) {
    return await this.finishedTrainingService.finishedByTrainingId(id);
  }
}
