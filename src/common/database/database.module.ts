import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseService } from './database.service';
import { TypedConfigModule } from '../typed-config/typed-config.module';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [TypedConfigModule],
      useClass: DatabaseService,
    }),
  ],
})
export class DatabaseModule {}
