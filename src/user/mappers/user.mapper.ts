import { User } from '../domain/user.aggregate';
import { UserOrm } from '../orm/user.orm';

export class UserMapper {
  static toDomain(userOrm: UserOrm): User {
    return new User(userOrm.id, userOrm.email, userOrm.name);
  }

  static toOrm(user: User): UserOrm {
    const userOrm = new UserOrm();
    userOrm.id = user.getId();
    userOrm.email = user.getEmail();
    userOrm.name = user.getName();
    return userOrm;
  }
}
