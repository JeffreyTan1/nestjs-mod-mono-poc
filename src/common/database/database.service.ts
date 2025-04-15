import { Injectable } from '@nestjs/common';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { createDataSourceOptions } from './create-data-source-options';
import { TypedConfigService } from '../typed-config/typed-config.service';

@Injectable()
export class DatabaseService implements TypeOrmOptionsFactory {
  constructor(private typedConfigService: TypedConfigService) {}

  createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      ...createDataSourceOptions({
        host: this.typedConfigService.getOrThrow('DB_HOST'),
        port: this.typedConfigService.getOrThrow('DB_PORT'),
        username: this.typedConfigService.getOrThrow('DB_USERNAME'),
        password: this.typedConfigService.getOrThrow('DB_PASSWORD'),
        entities: ['dist/**/*.orm{.ts,.js}'],
        logging: this.typedConfigService.getOrThrow('IS_LOCAL'),
      }),
      autoLoadEntities: true,
    };
  }
}
