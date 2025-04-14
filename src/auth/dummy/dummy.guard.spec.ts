import { ExecutionContext } from '@nestjs/common';
import { DummyGuard } from './dummy.guard';
import { UserRequest } from '../types';

describe('DummyGuard', () => {
  it('should be defined', () => {
    expect(new DummyGuard()).toBeDefined();
  });

  it('should return true and set user when valid email:id token is provided', () => {
    const guard = new DummyGuard();
    const request: UserRequest = {
      headers: {
        authorization: '123:test@example.com',
      },
    } as UserRequest;
    const context = {
      switchToHttp: () => ({
        getRequest: () => request,
      }),
    };
    const result = guard.canActivate(context as ExecutionContext);
    expect(result).toBe(true);
    expect(request.user).toEqual({
      id: '123',
      email: 'test@example.com',
    });
  });

  it('should return false when no token is provided', () => {
    const guard = new DummyGuard();
    const request: UserRequest = {
      headers: {},
    } as UserRequest;
    const context = {
      switchToHttp: () => ({
        getRequest: () => request,
      }),
    };
    const result = guard.canActivate(context as ExecutionContext);
    expect(result).toBe(false);
  });

  it('should return false when invalid token format is provided', () => {
    const guard = new DummyGuard();
    const request: UserRequest = {
      headers: {
        authorization: 'invalid-token',
      },
    } as UserRequest;
    const context = {
      switchToHttp: () => ({
        getRequest: () => request,
      }),
    };
    const result = guard.canActivate(context as ExecutionContext);
    expect(result).toBe(false);
  });
});
