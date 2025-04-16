import { Injectable } from '@nestjs/common';
import { User } from '../domain/user.aggregate';
import { UserOrm } from './user.orm';

@Injectable()
export class UserMapper {
  toDomain(orm: UserOrm): User {
    return new User(orm.email, orm.id);
  }

  toOrm(domain: User): UserOrm {
    return {
      id: domain.getId(),
      email: domain.getEmail(),
      createdAt: domain.getCreatedAt(),
      updatedAt: domain.getUpdatedAt(),
    };
  }
}
