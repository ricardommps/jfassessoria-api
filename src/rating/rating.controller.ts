import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { Roles } from 'src/decorators/roles.decorator';
import { UserId } from 'src/decorators/user-id.decorator';
import { UserType } from 'src/user/enum/user-type.enum';
import { DeleteResult } from 'typeorm';
import { CreateRatingDto } from './dtos/createRating.dto';
import { RatingEntity } from './entities/rating.entity';
import { RatingService } from './rating.service';

@Controller('rating')
export class RatingController {
  constructor(private readonly ratingService: RatingService) {}

  @Roles(UserType.Admin, UserType.Root)
  @Get()
  async getRatings(): Promise<RatingEntity[]> {
    return this.ratingService.getRatings();
  }

  @Roles(UserType.Admin, UserType.Root, UserType.User)
  @Delete()
  async deleteRating(@UserId() id: number): Promise<DeleteResult> {
    return this.ratingService.deleteRating(id);
  }

  @Roles(UserType.Admin, UserType.Root, UserType.User)
  @Get('/myRating')
  async getRating(@UserId() userId: number): Promise<RatingEntity> {
    return this.ratingService.getRatingByCustomer(userId);
  }

  @Roles(UserType.Admin, UserType.Root, UserType.User)
  @Post()
  @UsePipes(ValidationPipe)
  async createRating(
    @Body() createRatinDto: CreateRatingDto,
    @UserId() userId: number,
  ): Promise<RatingEntity> {
    return this.ratingService.createRating(createRatinDto, userId);
  }
}
