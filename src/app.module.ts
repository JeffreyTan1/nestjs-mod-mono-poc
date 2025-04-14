import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { TypedConfigModule } from './common/typed-config/typed-config.module';
import { DatabaseConfigModule } from './common/database-config/database-config.module';
import { AuthModule } from './auth/auth.module';
import { UtilsModule } from './common/utils/utils.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    TypedConfigModule,
    DatabaseConfigModule,
    AuthModule,
    UtilsModule,
    UserModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
