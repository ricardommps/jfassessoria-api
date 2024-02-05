import {
  IsArray,
  IsBoolean,
  IsDateString,
  IsInt,
  IsOptional,
  IsString,
} from 'class-validator';

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

  @IsInt()
  programId: number;
}
