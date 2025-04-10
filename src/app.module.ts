import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypedConfigModule } from './common/typed-config/typed-config.module';
import { DatabaseConfigModule } from './common/database-config/database-config.module';

@Module({
  imports: [TypedConfigModule, DatabaseConfigModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
