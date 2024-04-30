import { IsBoolean, IsInt, IsOptional, IsString } from 'class-validator';

export class CreateRatingDto {
  @IsInt()
  @IsOptional()
  ratingApp: number;

  @IsString()
  @IsOptional()
  commentsRatingApp: string;

  @IsInt()
  @IsOptional()
  ratingTrainings: number;

  @IsString()
  @IsOptional()
  commentsRatingTrainings: string;

  @IsString()
  @IsOptional()
  testimony: string;

  @IsBoolean()
  @IsOptional()
  notRating: boolean;
}
