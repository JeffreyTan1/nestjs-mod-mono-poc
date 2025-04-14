import { IRepository } from '@common/domain/repository.interface';
import { User } from './user.aggregate';

export interface IUserRepository extends IRepository<User> {
  findByEmail(email: string): Promise<User | null>;
}
