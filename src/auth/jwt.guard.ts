import {
  CanActivate,
  ExecutionContext,
  Injectable,
  Logger,
} from '@nestjs/common';
import { UserRequest } from './types';

@Injectable()
export class JwtGuard implements CanActivate {
  private readonly logger = new Logger(JwtGuard.name);

  constructor() {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<UserRequest>();
    const token = this.extractTokenFromHeader(request);

    if (!token) {
      this.logger.warn('No token found in request');
      return false;
    }

    try {
      request.user = {
        id: '123',
      };

      return true;
    } catch (error) {
      this.logger.error('Token verification failed', error);
      return false;
    }
  }

  private extractTokenFromHeader(request: UserRequest): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
