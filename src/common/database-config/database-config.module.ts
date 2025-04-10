import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseConfigService } from './database-config.service';
import { TypedConfigModule } from '../typed-config/typed-config.module';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [TypedConfigModule],
      useClass: DatabaseConfigService,
    }),
  ],
})
export class DatabaseConfigModule {}
