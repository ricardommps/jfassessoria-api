import {
  IsArray,
  IsBoolean,
  IsInt,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateTrainingFeedbackDto {
  @IsString()
  descriptionFeedback: string;

  @IsArray()
  @IsOptional()
  paces: [];

  @IsInt()
  finishedTrainingId: number;

  @IsOptional()
  @IsNumber()
  id: number;

  @IsOptional()
  @IsBoolean()
  viewed: boolean;
}
