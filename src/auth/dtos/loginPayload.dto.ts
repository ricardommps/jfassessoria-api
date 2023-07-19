import { UserEntity } from '../../user/entities/user.entity';

export class LoginPayload {
  userId: number;
  typeUser: number;

  constructor(user: UserEntity) {
    this.userId = user.id;
    this.typeUser = user.typeUser;
  }
}
