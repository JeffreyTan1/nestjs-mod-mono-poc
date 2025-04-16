import { ExecutionContext, NotFoundException } from '@nestjs/common';
import { DummyGuard } from './dummy.guard';
import { UserRequest } from '../types';
import { UserService } from '@user/user.service';
import { User } from '@user/domain/user.aggregate';

describe('DummyGuard', () => {
  let mockUserService: jest.Mocked<UserService>;

  beforeEach(() => {
    mockUserService = {
      findOne: jest.fn(),
    } as unknown as jest.Mocked<UserService>;
  });

  it('should be defined', () => {
    expect(new DummyGuard(mockUserService)).toBeDefined();
  });

  it('should return true and set user when valid email:id token is provided', async () => {
    const guard = new DummyGuard(mockUserService);
    const user = new User('test@example.com', '123');
    mockUserService.findByEmail.mockResolvedValue(user);

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
    const result = await guard.canActivate(context as ExecutionContext);
    expect(result).toBe(true);
    expect(request.user).toEqual(user);
  });

  it('should return false when no token is provided', async () => {
    const guard = new DummyGuard(mockUserService);
    const request: UserRequest = {
      headers: {},
    } as UserRequest;
    const context = {
      switchToHttp: () => ({
        getRequest: () => request,
      }),
    };
    const result = await guard.canActivate(context as ExecutionContext);
    expect(result).toBe(false);
  });

  it('should return false when invalid token format is provided', async () => {
    const guard = new DummyGuard(mockUserService);
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
    const result = await guard.canActivate(context as ExecutionContext);
    expect(result).toBe(false);
  });

  it('should return false when user is not found', async () => {
    const guard = new DummyGuard(mockUserService);
    mockUserService.findByEmail.mockRejectedValue(
      new NotFoundException('User not found'),
    );

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
    const result = await guard.canActivate(context as ExecutionContext);
    expect(result).toBe(false);
  });
});
