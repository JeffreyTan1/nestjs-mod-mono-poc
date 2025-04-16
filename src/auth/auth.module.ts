import { UserModule } from '@user/user.module';
import { Module } from '@nestjs/common';

@Module({})
export class AuthModule {
  imports: [UserModule];
}
