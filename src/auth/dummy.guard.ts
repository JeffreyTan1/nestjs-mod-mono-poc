import {
  CanActivate,
  ExecutionContext,
  Injectable,
  Logger,
} from '@nestjs/common';
import { User, UserRequest } from './types';

@Injectable()
export class DummyGuard implements CanActivate {
  private readonly logger = new Logger(DummyGuard.name);

  constructor() {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<UserRequest>();
    const token = this.extractTokenFromHeader(request);

    if (!token) {
      this.logUnauthenticatedRequest('No token found.');
      return false;
    }

    try {
      request.user = this.decryptToken(token);
      return true;
    } catch (error) {
      this.logUnauthenticatedRequest('Token is invalid.', error);
      return false;
    }
  }

  private logUnauthenticatedRequest(details: string, error?: unknown): void {
    this.logger.warn(`An unauthenticated request was made. ${details}`);
    if (error) {
      this.logger.error(error);
    }
  }

  private extractTokenFromHeader(request: UserRequest): string | undefined {
    return request.headers.authorization;
  }

  // Simulates a JWT decryption
  private decryptToken(token: string): User {
    const [email, id] = token.split(':');
    return {
      id,
      email,
    };
  }
}
