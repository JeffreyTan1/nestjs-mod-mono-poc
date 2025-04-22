import { IRepository } from '@common/domain/repository.interface';
import { User } from './user.aggregate';

export const USER_REPOSITORY = Symbol('USER_REPOSITORY');
export interface IUserRepository extends IRepository<User> {
  findByEmail(email: string): Promise<User | null>;
}
