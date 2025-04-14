import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { UserRepository } from './persistence/user.repository';
import { UserMapper } from './persistence/user.mapper';

@Module({
  controllers: [UserController],
  providers: [UserService, UserRepository, UserMapper],
})
export class UserModule {}
