import { Repository } from 'typeorm';
import { IUserRepository } from '../domain/user-repository.interface';
import { User } from '../domain/user.aggregate';
import { UserOrm } from './user.orm';
import { UserMapper } from './user.mapper';

export class UserRepository implements IUserRepository {
  constructor(
    private readonly userRepository: Repository<UserOrm>,
    private readonly userMapper: UserMapper,
  ) {}

  async findByEmail(email: string) {
    const user = await this.userRepository.findOne({
      where: {
        email,
      },
    });
    return user ? UserMapper.toDomain(user) : null;
  }

  async findById(id: string) {
    const user = await this.userRepository.findOne({ where: { id } });
    return user ? UserMapper.toDomain(user) : null;
  }

  async save(user: User) {
    const userOrm = UserMapper.toOrm(user);
    const savedUserOrm = await this.userRepository.save(userOrm);
    return UserMapper.toDomain(savedUserOrm);
  }

  async delete(user: User) {
    const userOrm = UserMapper.toOrm(user);
    await this.userRepository.delete(userOrm);
  }
}
