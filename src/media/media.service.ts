import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserService } from '../user/user.service';
import { CreateMediaDto } from './dtos/createMedia.dtos';
import { MediaEntity } from './entities/media.entity';

@Injectable()
export class MediaService {
  constructor(
    @InjectRepository(MediaEntity)
    private readonly mediaEntity: Repository<MediaEntity>,

    @Inject(forwardRef(() => UserService))
    private readonly userService: UserService,
  ) {}

  async getMedias(userId: number): Promise<MediaEntity[]> {
    const medias = await this.mediaEntity.find({
      where: {
        userId,
      },
      order: { updatedAt: 'DESC' },
    });
    return medias;
  }

  async createMedia(
    createMediaDto: CreateMediaDto,
    userId: number,
  ): Promise<MediaEntity> {
    await this.userService.findUserById(userId);
    return this.mediaEntity.save({
      ...createMediaDto,
      userId,
    });
  }
}
