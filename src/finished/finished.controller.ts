import { Body, Controller, Get, Param, Post, Put, Query } from '@nestjs/common';
import { Roles } from 'src/decorators/roles.decorator';
import { UserId } from 'src/decorators/user-id.decorator';
import { UserType } from 'src/user/enum/user-type.enum';
import { FinishedEntity } from './entities/finished.entity';
import { FinishedService } from './finished.service';

@Controller('finished')
export class FinishedController {
  constructor(private readonly finishedService: FinishedService) {}

  @Roles(UserType.Admin, UserType.Root, UserType.User)
  @Post()
  async createFinished(@Body() createFinishedDto): Promise<FinishedEntity> {
    return this.finishedService.createFinished(createFinishedDto);
  }

  @Roles(UserType.Admin, UserType.Root, UserType.User)
  @Get('listByUser')
  async findFinished(
    @UserId() userId: number,
    @Query('timestampFrom') timestampFrom?: string,
    @Query('timestampTo') timestampTo?: string,
  ) {
    return await this.finishedService.findFinished(
      userId,
      timestampFrom,
      timestampTo,
    );
  }

  @Roles(UserType.Admin, UserType.Root)
  @Put('/review/:customerId/:id')
  async reviewWorkout(
    @Body() reviewWorkoutDto,
    @Param('id') id: string,
    @Param('customerId') customerId: string,
  ): Promise<FinishedEntity> {
    const { feedback } = reviewWorkoutDto;
    return this.finishedService.reviewWorkout(
      Number(customerId),
      Number(id),
      feedback,
    );
  }

  @Roles(UserType.Admin, UserType.Root)
  @Get('/unreviewedFinished')
  async getUnreviewedFinished() {
    return this.finishedService.getUnreviewedFinished();
  }

  @Roles(UserType.Admin, UserType.Root)
  @Get('listByUserAdmin/:userId')
  async findFinishedAdmin(
    @Param('userId') userId: string,
    @Query('timestampFrom') timestampFrom?: string,
    @Query('timestampTo') timestampTo?: string,
  ) {
    return await this.finishedService.findFinished(
      Number(userId),
      timestampFrom,
      timestampTo,
    );
  }

  @Roles(UserType.Admin, UserType.Root, UserType.User)
  @Get('/:id')
  async findFinishedById(@UserId() userId: number, @Param('id') id: string) {
    return await this.finishedService.findFinishedById(userId, Number(id));
  }
}
