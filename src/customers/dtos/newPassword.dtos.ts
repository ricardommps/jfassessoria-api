import { IsString } from 'class-validator';

export class NewPasswordDTO {
  @IsString()
  newPassword: string;
}
