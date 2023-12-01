import { IsBoolean, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateFinishedTrainingDto {
  @IsOptional()
  @IsNumber()
  id: number;

  @IsNumber()
  trainingId: number;

  @IsOptional()
  @IsNumber()
  distance: number;

  @IsOptional()
  @IsNumber()
  duration: number;

  @IsOptional()
  @IsString()
  pace: string;

  @IsOptional()
  @IsNumber()
  rpe: number;

  @IsOptional()
  @IsString()
  trimp: string;

  @IsOptional()
  @IsString()
  link: string;

  @IsOptional()
  @IsString()
  comments: string;

  @IsOptional()
  @IsBoolean()
  review: boolean;
}
