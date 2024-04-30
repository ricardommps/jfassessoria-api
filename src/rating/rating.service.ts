import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CustomersService } from 'src/customers/customers.service';
import { DeleteResult, Repository } from 'typeorm';
import { CreateRatingDto } from './dtos/createRating.dto';
import { RatingEntity } from './entities/rating.entity';

@Injectable()
export class RatingService {
  constructor(
    @InjectRepository(RatingEntity)
    private readonly ratingRepository: Repository<RatingEntity>,
    private readonly customersService: CustomersService,
  ) {}

  async getRatings(): Promise<RatingEntity[]> {
    return this.ratingRepository.find({
      relations: {
        customer: true,
      },
      order: { updatedAt: 'DESC' },
    });
  }

  async getRating(id: number): Promise<RatingEntity> {
    const rating = await this.ratingRepository.findOne({
      where: {
        id: id,
      },
    });
    if (!rating) {
      throw new NotFoundException(`Rating id: ${id} not found`);
    }
    return rating;
  }

  async getRatingByCustomer(id: number): Promise<RatingEntity> {
    const rating = await this.ratingRepository.findOne({
      where: {
        customerId: id,
      },
    });
    return rating;
  }

  async createRating(
    createRatingDto: CreateRatingDto,
    userId,
  ): Promise<RatingEntity> {
    const rating = await this.getRatingByCustomer(userId);
    if (rating) {
      await this.ratingRepository.delete({ id: rating.id });
    }
    return this.ratingRepository.save({
      ...createRatingDto,
      customerId: userId,
    });
  }

  async deleteRating(id): Promise<DeleteResult> {
    return this.ratingRepository.delete({ customerId: id });
  }
}
