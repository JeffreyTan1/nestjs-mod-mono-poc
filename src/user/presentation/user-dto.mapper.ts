import { User } from '../domain/user.aggregate';
import { UserDto } from './dto/user.dto';
import { Injectable } from '@nestjs/common';
@Injectable()
export class UserDtoMapper {
  toDto(user: User): UserDto {
    return {
      id: user.getId(),
      email: user.getEmail(),
      createdAt: user.getCreatedAt(),
      updatedAt: user.getUpdatedAt(),
    };
  }
}
