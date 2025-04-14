import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { UserRepository } from './persistence/user.repository';
import { UserMapper } from './persistence/user.mapper';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserOrm } from './persistence/user.orm';

@Module({
  imports: [TypeOrmModule.forFeature([UserOrm])],
  controllers: [UserController],
  providers: [UserService, UserRepository, UserMapper],
  exports: [UserService],
})
export class UserModule {}
