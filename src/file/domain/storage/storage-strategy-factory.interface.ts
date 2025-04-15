import { IStorageStrategy } from './storage-strategy.interface';
import { StorageStrategyType } from './storage-strategy-type.enum';

export interface IStorageStrategyFactory {
  getStrategy(strategy: StorageStrategyType): IStorageStrategy;
}
