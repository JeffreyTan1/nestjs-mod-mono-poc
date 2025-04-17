import { Injectable } from '@nestjs/common';
import { IStorageStrategy } from './storage-strategy.interface';
import { LocalStorageStrategy } from './local-storage.strategy';
import { StorageStrategyType } from '../../domain/storage-strategy-type.enum';

@Injectable()
export class StorageStrategyFactory {
  getStrategy(strategy: StorageStrategyType): IStorageStrategy {
    switch (strategy) {
      case StorageStrategyType.LOCAL:
        return new LocalStorageStrategy();
      default:
        throw new Error(`Storage strategy ${String(strategy)} not found.`);
    }
  }
}
