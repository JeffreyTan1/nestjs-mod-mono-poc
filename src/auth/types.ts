import { Request } from 'express';

export type UserRequest = Request & {
  userId: string;
};
