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
      const user = await this.userService.findOne(email);
      if (!user) {
        this.logUnauthenticatedRequest('User not found.');
        return false;
      }
      request.user = user;
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

  private decryptToken(token: string): { id: string; email: string } {
    const parts = token.split(':');
    if (parts.length !== 2) {
      throw new Error('Invalid token format. Expected format: id:email');
    }
    const [id, email] = parts;
    return {
      id,
      email,
    };
  }
}
