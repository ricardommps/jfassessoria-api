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
  programsId: [];
}
