import { Injectable } from '@nestjs/common';
import { IStorageStrategyFactory } from '../domain/storage/storage-strategy-factory.interface';
import { IStorageStrategy } from '../domain/storage/storage-strategy.interface';
import { LocalStorageStrategy } from './local-storage.strategy';
import { StorageStrategyType } from '../domain/storage/storage-strategy-type.enum';

@Injectable()
export class StorageStrategyFactory implements IStorageStrategyFactory {
  getStrategy(strategy: StorageStrategyType): IStorageStrategy {
    switch (strategy) {
      case StorageStrategyType.LOCAL:
        return new LocalStorageStrategy();
      default:
        throw new Error(`Storage strategy ${String(strategy)} not found.`);
    }
  }
}
