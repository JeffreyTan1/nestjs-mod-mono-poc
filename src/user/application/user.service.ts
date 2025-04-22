import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { User } from '../domain/user.aggregate';
import {
  USER_REPOSITORY,
  IUserRepository,
} from '../domain/user-repository.interface';

@Injectable()
export class UserService {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepository: IUserRepository,
  ) {}

  async create(email: string): Promise<User> {
    return await this.userRepository.save(new User(email));
  }

  async findByEmail(email: string): Promise<User> {
    const user = await this.userRepository.findByEmail(email);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async deleteByEmail(email: string): Promise<void> {
    const user = await this.findByEmail(email);
    return this.userRepository.delete(user);
  }
}
