import {
  IsArray,
  IsBoolean,
  IsDateString,
  IsOptional,
  IsString,
} from 'class-validator';

export class SendTrainingDto {
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

  @IsDateString()
  @IsOptional()
  datePublished: Date;

  @IsDateString()
  @IsOptional()
  trainingDateOther: Date;

  @IsBoolean()
  published: boolean;

  @IsBoolean()
  finished: boolean;

  @IsBoolean()
  @IsOptional()
  hide: boolean;

  @IsArray()
  @IsOptional()
  videos: [];

  @IsArray()
  @IsOptional()
  mediaOrder: number[];

  @IsArray()
  @IsOptional()
  exerciseInfo: object[];

  @IsArray()
  programsId: [];
}
