import { IStorageStrategy } from './storage-strategy.interface';
import { StorageStrategy } from './storage-strategy.enum';

export interface IStorageStrategyFactory {
  getStrategy(strategy: StorageStrategy): IStorageStrategy;
}
