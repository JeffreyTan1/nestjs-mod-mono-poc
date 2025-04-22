import { IStorageStrategy } from './storage-strategy.interface';
import { StorageStrategyType } from './storage-strategy-type.enum';

export const STORAGE_STRATEGY_FACTORY = Symbol('STORAGE_STRATEGY_FACTORY');
export interface IStorageStrategyFactory {
  getStrategy(strategy: StorageStrategyType): IStorageStrategy;
}
