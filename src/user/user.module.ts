import { Module } from '@nestjs/common';
import { UserService } from './application/user.service';
import { UserController } from './presentation/user/user.controller';
import { BackdoorController } from './presentation/backdoor/backdoor.controller';
import { UserRepository } from './infrastructure/user.repository';
import { UserMapper } from './infrastructure/user.mapper';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserOrm } from './infrastructure/user.orm';
import { UserDtoMapper } from './presentation/dto/user-dto.mapper';
import { USER_REPOSITORY } from './domain/user-repository.interface';

@Module({
  imports: [TypeOrmModule.forFeature([UserOrm])],
  controllers: [UserController, BackdoorController],
  providers: [
    {
      provide: USER_REPOSITORY,
      useClass: UserRepository,
    },
    UserService,
    UserRepository,
    UserMapper,
    UserDtoMapper,
  ],
  exports: [UserService],
})
export class UserModule {}
