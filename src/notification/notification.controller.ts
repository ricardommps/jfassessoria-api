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
import { Roles } from 'src/decorators/roles.decorator';
import { UserId } from 'src/decorators/user-id.decorator';
import { UserType } from 'src/user/enum/user-type.enum';
import { NotificationEntity } from './entities/notification.entity';
import { NotificationService } from './notification.service';

@Controller('notification')
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}

  @Roles(UserType.Admin)
  @Post()
  @UsePipes(ValidationPipe)
  async createProgram(@Body() notifications) {
    return this.notificationService.createNotification(notifications);
  }

  @Roles(UserType.Admin, UserType.Root, UserType.User)
  @Get('/all')
  async getNotificationByRecipientId(@UserId() userId: number) {
    return await this.notificationService.getNotificationByRecipientId(userId);
  }

  @Roles(UserType.Admin)
  @Get('/all/:recipientId')
  async getNotificationByCustomerId(@Param('recipientId') recipientId: number) {
    return await this.notificationService.getNotificationByRecipientId(
      recipientId,
    );
  }

  @Roles(UserType.Admin, UserType.Root, UserType.User)
  @Get('/readAt/:notificationId')
  @UsePipes(ValidationPipe)
  async readAt(
    @UserId() userId: number,
    @Param('notificationId') notificationId: number,
  ): Promise<NotificationEntity> {
    return this.notificationService.readAt(notificationId, userId);
  }

  @Roles(UserType.Admin, UserType.Root)
  @Delete('/:id')
  async deleteNotification(@Param('id') id: string) {
    return this.notificationService.deleteNotification(+id);
  }

  @Roles(UserType.Admin)
  @Get('/:id')
  async findNotificationById(@Param('id') id: string) {
    return this.notificationService.findNotificationById(+id);
  }

  @Roles(UserType.Admin)
  @Put('/:notificationId')
  @UsePipes(ValidationPipe)
  async updateProgram(
    @Body() notificationUpdate,
    @Param('notificationId') notificationId: number,
  ) {
    return this.notificationService.updateNotification(
      notificationUpdate,
      notificationId,
    );
  }
}
