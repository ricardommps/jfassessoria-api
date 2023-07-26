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
  description: string;

  @IsString()
  @IsOptional()
  coverPath: string;

  @IsDateString()
  @IsOptional()
  datePublished: Date;

  @IsBoolean()
  published: boolean;

  @IsArray()
  @IsOptional()
  videos: [];

  @IsInt()
  programId: number;
}
