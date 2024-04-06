import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { Roles } from '../decorators/roles.decorator';
import { UserId } from '../decorators/user-id.decorator';
import { UserType } from '../user/enum/user-type.enum';
import { CreateMediaDto } from './dtos/createMedia.dtos';
import { ReturnMediaDto } from './dtos/returnMedia.dtos';
import { MediaEntity } from './entities/media.entity';
import { MediaService } from './media.service';

@Controller('media')
export class MediaController {
  constructor(private readonly mediaService: MediaService) {}

  @Roles(UserType.Admin, UserType.Root)
  @Get()
  async getMedias(@UserId() userId: number): Promise<ReturnMediaDto[]> {
    return (await this.mediaService.getMedias(userId)).map(
      (mediaEntity) => new ReturnMediaDto(mediaEntity),
    );
  }

  @Roles(UserType.Admin, UserType.Root)
  @UsePipes(ValidationPipe)
  @Post()
  async createMedia(
    @Body() createMediaDto: CreateMediaDto,
    @UserId() userId: number,
  ): Promise<MediaEntity> {
    return this.mediaService.createMedia(createMediaDto, userId);
  }

  @Roles(UserType.Admin, UserType.Root)
  @Get('/:id')
  async getMediaById(
    @Param('id') id: number,
    @UserId() userId: number,
  ): Promise<ReturnMediaDto> {
    return new ReturnMediaDto(
      await this.mediaService.findMediaById(id, userId),
    );
  }
}
