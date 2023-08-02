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

  @IsBoolean()
  published: boolean;

  @IsArray()
  @IsOptional()
  videos: [];

  @IsArray()
  programsId: [];
}
