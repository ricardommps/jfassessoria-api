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
  @IsOptional()
  subtitle: string;

  @IsString()
  @IsOptional()
  heating: string;

  @IsString()
  @IsOptional()
  recovery: string;

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

  @IsDateString()
  @IsOptional()
  trainingDateOther: Date;

  @IsBoolean()
  @IsOptional()
  hide: boolean;

  @IsBoolean()
  finished: boolean;

  @IsBoolean()
  published: boolean;

  @IsArray()
  @IsOptional()
  mediaOrder: number[];

  @IsArray()
  @IsOptional()
  exerciseInfo: object[];
}
