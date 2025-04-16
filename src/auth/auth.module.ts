import { UserModule } from '@user/user.module';
import { Module } from '@nestjs/common';

@Module({
  imports: [UserModule],
  exports: [UserModule],
})
export class AuthModule {}
