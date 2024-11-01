import {
  IsArray,
  IsBoolean,
  IsDateString,
  IsInt,
  IsOptional,
  IsString,
} from 'class-validator';
import { MediaEntity } from 'src/media/entities/media.entity';

export class CreateTrainingDto {
  @IsString()
  name: string;

  @IsString()
  @IsOptional()
  subtitle: string;

  @IsString()
  description: string;

  @IsString()
  @IsOptional()
  coverPath: string;

  @IsString()
  @IsOptional()
  heating: string;

  @IsString()
  @IsOptional()
  recovery: string;

  @IsDateString()
  @IsOptional()
  datePublished: Date;

  @IsDateString()
  @IsOptional()
  trainingDateOther: Date;

  @IsBoolean()
  published: boolean;

  @IsBoolean()
  @IsOptional()
  hide: boolean;

  @IsBoolean()
  @IsOptional()
  finished: boolean;

  @IsArray()
  @IsOptional()
  videos: [];

  @IsArray()
  @IsOptional()
  mediaOrder: object[];

  @IsArray()
  @IsOptional()
  stretchesOrder: object[];

  @IsArray()
  @IsOptional()
  heatingOrder: object[];

  @IsArray()
  @IsOptional()
  medias: MediaEntity[];

  @IsArray()
  @IsOptional()
  exerciseInfo: object[];

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  tags?: string[];

  @IsInt()
  programId: number;
}
