import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CustomersService } from 'src/customers/customers.service';
import { Repository } from 'typeorm';
import { NotificationEntity } from './entities/notification.entity';

@Injectable()
export class NotificationService {
  constructor(
    @InjectRepository(NotificationEntity)
    private readonly notificationEntity: Repository<NotificationEntity>,

    private readonly customersService: CustomersService,
  ) {}

  async createNotification(notification) {
    await this.customersService.findCustomerById(notification.recipientId);
    return this.notificationEntity.save({
      ...notification,
    });
  }

  async findNotificationById(
    notificationId: number,
  ): Promise<NotificationEntity> {
    const notification = await this.notificationEntity.findOne({
      where: {
        id: notificationId,
      },
    });
    if (!notification) {
      throw new NotFoundException(
        `Notification id: ${notificationId} not found`,
      );
    }
    return notification;
  }

  async getNotificationByRecipientId(recipientId: number) {
    const programs = await this.notificationEntity.find({
      where: {
        recipientId,
      },
      order: { createdAt: 'DESC' },
    });

    return programs;
  }

  async readAt(notificationId: number, recipientId: number) {
    const notification = await this.findNotificationById(notificationId);
    if (notification.recipientId !== recipientId) {
      throw new UnauthorizedException();
    }
    notification.readAt = new Date();
    return this.notificationEntity.save({
      ...notification,
    });
  }

  async deleteNotification(notificationId: number) {
    await this.findNotificationById(notificationId);

    return this.notificationEntity.delete({ id: notificationId });
  }
}
