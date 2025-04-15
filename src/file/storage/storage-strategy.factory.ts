import { Injectable } from '@nestjs/common';
import { IStorageStrategyFactory } from '../domain/storage/storage-strategy-factory.interface';
import { IStorageStrategy } from '../domain/storage/storage-strategy.interface';
import { LocalStorageStrategy } from './local-storage.strategy';
import { StorageStrategy } from '../domain/storage/storage-strategy.enum';

@Injectable()
export class StorageStrategyFactory implements IStorageStrategyFactory {
  getStrategy(strategy: StorageStrategy): IStorageStrategy {
    switch (strategy) {
      case StorageStrategy.LOCAL:
        return new LocalStorageStrategy();
      default:
        throw new Error(`Storage strategy ${String(strategy)} not found.`);
    }
  }
}
