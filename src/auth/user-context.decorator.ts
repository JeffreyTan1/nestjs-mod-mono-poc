import {
  createParamDecorator,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { UserRequest } from './types';

export const UserCtx = createParamDecorator(
  (_: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest<UserRequest>();
    const userId = request.userId;
    if (!userId) {
      throw new UnauthorizedException('User not found in request');
    }
    return userId;
  },
);
