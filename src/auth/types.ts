import { Request } from 'express';

export type User = {
  id: string;
  // TODO: add more fields
};

export type UserRequest = Request & {
  user: User;
};
