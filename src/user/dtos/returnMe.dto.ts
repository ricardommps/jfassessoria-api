import { UserEntity } from '../entities/user.entity';
interface User {
  id: number;
  name: string;
  email: string;
  temporaryPassword: boolean;
}

export class ReturnMeDto {
  user: User;
  constructor(userEntity: UserEntity) {
    this.user.id = userEntity.id;
    this.user.name = userEntity.name;
    this.user.email = userEntity.email;
    this.user.temporaryPassword = userEntity.temporaryPassword;
  }
}
