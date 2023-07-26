import {
  IsArray,
  IsBoolean,
  IsDateString,
  IsOptional,
  IsString,
} from 'class-validator';

export class UpdateTrainingDto {
  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsString()
  @IsOptional()
  coverPath: string;

  @IsArray()
  @IsOptional()
  videos: [];

  @IsDateString()
  @IsOptional()
  datePublished: Date;

  @IsBoolean()
  published: boolean;
}
