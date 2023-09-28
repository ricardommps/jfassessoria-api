import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { FinishedTrainingService } from './finished-training.service';
import { UserType } from 'src/user/enum/user-type.enum';
import { Roles } from 'src/decorators/roles.decorator';
import { ReturnFinishedTrainingDto } from './dtos/returnFinishedTraining.dto';
import { CreateFinishedTrainingDto } from './dtos/createFinishedTraining.dto';

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
  async createCustomer(
    @Body() createFinishedDto: CreateFinishedTrainingDto,
  ): Promise<ReturnFinishedTrainingDto> {
    return this.finishedTrainingService.createFinished(createFinishedDto);
  }

  @Roles(UserType.Admin, UserType.Root, UserType.User)
  @Get(':id')
  async findFinishedById(@Param('id') id: string) {
    return await this.finishedTrainingService.findFinishedById(id);
  }
}
