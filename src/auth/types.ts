import { Request } from 'express';
import { User } from '@/user/domain/user.aggregate';

export type UserRequest = Request & {
  user: User;
};
