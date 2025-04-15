import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UserRepository } from './persistence/user.repository';
import { User } from './domain/user.aggregate';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    return await this.userRepository.save(new User(createUserDto.email));
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
