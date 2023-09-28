import { IsBoolean, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateFinishedTrainingDto {
  @IsNumber()
  trainingId: number;

  @IsNumber()
  distance: number;

  @IsNumber()
  duration: number;

  @IsString()
  pace: string;

  @IsNumber()
  rpe: number;

  @IsString()
  trimp: string;

  @IsOptional()
  @IsString()
  link: string;

  @IsOptional()
  @IsBoolean()
  reviw: boolean;
}
