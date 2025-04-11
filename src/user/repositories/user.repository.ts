import { Injectable } from '@nestjs/common';
import { IRepository } from '../../common/repository.interface';
import { User } from '../domain/user.aggregate';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UserOrm } from '../orm/user.orm';
import { UserMapper } from '../mappers/user.mapper';

@Injectable()
export class UserRepository implements IRepository<User> {
  constructor(
    @InjectRepository(UserOrm)
    private userRepository: Repository<UserOrm>,
  ) {}

  async save(user: User): Promise<User> {
    const userOrm = UserMapper.toOrm(user);
    const createdUser = await this.userRepository.save(userOrm);
    return UserMapper.toDomain(createdUser);
  }

  async findById(id: string): Promise<User | null> {
    const userOrm = await this.userRepository.findOneBy({ id });
    return userOrm ? UserMapper.toDomain(userOrm) : null;
  }

  async remove(user: User): Promise<void> {
    const userOrm = UserMapper.toOrm(user);
    await this.userRepository.remove(userOrm);
  }
}
