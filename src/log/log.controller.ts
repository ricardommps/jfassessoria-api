import {
  Body,
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UserId } from 'src/decorators/user-id.decorator';
import { Roles } from '../decorators/roles.decorator';
import { UserType } from '../user/enum/user-type.enum';
import { LogEntity } from './entities/log.entity';
import { LogService } from './log.service';

@Controller('log')
export class LogController {
  constructor(private readonly logService: LogService) {}

  @Roles(UserType.Admin, UserType.Root, UserType.User)
  @Post()
  @UsePipes(ValidationPipe)
  async createTraining(
    @Body() logPaylod,
    @UserId() userId: number,
  ): Promise<LogEntity> {
    return this.logService.createLog(logPaylod, userId);
  }
}
