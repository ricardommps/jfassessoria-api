import {
  Inject,
  Injectable,
  NotFoundException,
  forwardRef,
} from '@nestjs/common';
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

  async getMediasWithStretchTag(userId: number): Promise<MediaEntity[]> {
    const medias = await this.mediaEntity
      .createQueryBuilder('media')
      .where('media.userId = :userId', { userId })
      .andWhere('media.tags @> :tag', { tag: ['Alongamentos'] }) // Usar operador @> para arrays
      .orderBy('media.updatedAt', 'DESC')
      .getMany();

    return medias;
  }

  async getMediasWithTagFiltered(
    userId: number,
    tags: string[],
  ): Promise<MediaEntity[]> {
    const medias = await this.mediaEntity
      .createQueryBuilder('media')
      .where('media.userId = :userId', { userId })
      .andWhere('media.tags && :tags', { tags })
      .orderBy('media.updatedAt', 'DESC')
      .getMany();

    return medias;
  }

  async findMediaById(id: number, userId: number): Promise<MediaEntity> {
    const media = await this.mediaEntity.findOne({
      where: {
        userId,
        id,
      },
    });
    if (!media) {
      throw new NotFoundException(`Media: ${id} Not Found`);
    }
    return media;
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

  async updateMedia(mediaUpdate, mediaId: number) {
    const media = await this.mediaEntity.findOne({
      where: {
        id: mediaId,
      },
    });
    if (!media) {
      throw new NotFoundException(`Media: ${mediaId} Not Found`);
    }
    return this.mediaEntity.save({
      ...media,
      ...mediaUpdate,
    });
  }

  async deleteMedia(mediaId: number) {
    const media = await this.mediaEntity.findOne({
      where: {
        id: mediaId,
      },
    });
    if (!media) {
      throw new NotFoundException(`Media: ${mediaId} Not Found`);
    }

    return this.mediaEntity.delete({ id: mediaId });
  }
}
