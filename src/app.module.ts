import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { TypedConfigModule } from './common/typed-config/typed-config.module';
import { DatabaseModule } from './common/database/database.module';
import { AuthModule } from './auth/auth.module';
import { UtilsModule } from './common/utils/utils.module';
import { UserModule } from './user/user.module';
import { FileModule } from './file/file.module';

@Module({
  imports: [
    TypedConfigModule,
    DatabaseModule,
    AuthModule,
    UtilsModule,
    UserModule,
    FileModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
