import { IsBoolean, IsOptional, IsString } from 'class-validator';

export class CreateMediaDto {
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  thumbnail: string;

  @IsString()
  videoUrl: string;

  @IsOptional()
  @IsString()
  instrucctions: string;

  @IsBoolean()
  blocked: boolean;
}
