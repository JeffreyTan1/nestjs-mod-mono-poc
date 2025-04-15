import {
  CanActivate,
  ExecutionContext,
  Injectable,
  Logger,
} from '@nestjs/common';
import { UserRequest } from '../types';
import { UserService } from '@/user/user.service';

@Injectable()
export class DummyGuard implements CanActivate {
  private readonly logger = new Logger(DummyGuard.name);

  constructor(private readonly userService: UserService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<UserRequest>();
    const token = this.extractTokenFromHeader(request);

    if (!token) {
      this.logUnauthenticatedRequest('No token found.');
      return false;
    }

    try {
      const { email } = this.decryptToken(token);
      const user = await this.userService.findByEmail(email);
      if (!user) {
        this.logUnauthenticatedRequest('User not found.');
        return false;
      }
      request.user = user;
      return true;
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      this.logUnauthenticatedRequest('Token is invalid.');
      return false;
    }
  }

  private logUnauthenticatedRequest(details: string): void {
    this.logger.warn(`${details}`);
  }

  private extractTokenFromHeader(request: UserRequest): string | undefined {
    const token = request.headers.authorization?.split('Bearer ').at(1);
    if (!token) {
      throw new Error(
        'Invalid authorization header format. Expected format: Bearer token',
      );
    }
    return token;
  }

  private decryptToken(token: string): { id: string; email: string } {
    const parts = token.split(':');
    if (parts.length !== 2) {
      throw new Error('Invalid token format. Expected format: id:email');
    }
    const [id, email] = parts;
    return { id, email };
  }
}
